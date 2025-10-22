let detailFrame = document.getElementById('detail-frame');
detailFrame.addEventListener('load', function() {
    try {
        // 确保 iframe 已加载且可以访问其内容
        let iframeDocument = detailFrame.contentWindow.document;
        // 获取 iframe 内部页面的标题
        let iframeTitle = iframeDocument.title;

        // 如果 iframe 有标题，则将其设置为父页面的标题
        if (iframeTitle && iframeTitle !== '') {
            document.title = iframeTitle;
        }
    } catch (e) {
        console.log('无法访问iframe内容，可能由于跨域限制。');
    }
});