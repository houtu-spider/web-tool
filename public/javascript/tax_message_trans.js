import {send_message_toast} from './send_toast.js'

function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

function convertTaxStatement(taxText) {
    // 按行分割输入文本
    const lines = taxText.trim().split('\n');
    const result = [];
    let totalAmount = 0;

    // 处理每个税款项
    for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 >= lines.length) break;

        const taxName = lines[i].trim();
        const amountLine = lines[i + 1].trim();

        // 使用正则表达式匹配金额（最后一个数字，可能包含逗号和小数点）
        const amountMatch = amountLine.match(/(\d{1,3}(,\d{3})*\.\d+|\d+\.\d+)$/);

        if (amountMatch) {
            const amount = amountMatch[0];
            // 去掉税名和金额之间的空格，直接连接
            result.push(`${taxName}${amount}`);

            // 将金额转换为数字并累加（去掉逗号）
            const amountNum = parseFloat(amount.replace(/,/g, '')) * 100;
            totalAmount += amountNum;
        }
    }

    totalAmount = totalAmount / 100;
    // 格式化总金额（添加千位分隔符）
    const formattedTotal = totalAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // 添加合计行
    result.push(`合计${formattedTotal}`);

    return result.join('\n');
}


document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // 转换函数（示例：转换为大写，您可以根据需要修改转换逻辑）[2](@ref)
    function convertText() {
        const input = inputText.value;
        // 示例转换逻辑：转换为大写
        outputText.value = convertTaxStatement(input);
    }

    // 带防抖的自动转换函数[6](@ref)
    const debouncedConvert = debounce(convertText, 300);

    // 输入框输入事件监听[2](@ref)
    inputText.addEventListener('input', () => {
        debouncedConvert();
    });

    // 手动转换按钮事件
    convertBtn.addEventListener('click', convertText);

    // 页面加载时自动触发一次转换（可选）[7](@ref)
    window.addEventListener('load', () => {
        if (inputText.value) {
            convertText();
        }
    });

    // 复制按钮事件
    copyBtn.addEventListener('click', async () => {
        try {
            if (!outputText.value || !outputText.value.length) {
                send_message_toast("复制失败!", "请先输入要转换的文本", "error")
                return;
            }
            await navigator.clipboard.writeText(outputText.value);
            if (typeof Swal !== 'undefined') {
                send_message_toast("复制成功!", "内容已复制到剪贴板")
            } else {
                alert('复制成功！');
            }
        } catch (err) {
            console.error('复制失败:', err);
            if (typeof Swal !== 'undefined') {
                send_message_toast("复制失败", "请手动选择文本复制", "error")
            } else {
                alert('复制失败，请手动选择文本复制');
            }
        }
    });

    // 清空按钮事件
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    });
});