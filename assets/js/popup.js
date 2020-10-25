btn.popup.attachEventListener(function () {
    chrome.windows.create({
        url: 'popup.html',
        width: 174,
        height: 280,
        type: 'popup'
    });
});
