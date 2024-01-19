/* global chrome */  /* 加上这行才能使用 chrome */
/* global browser */

const forbiddenList = ["zhihu.com"]
const browserType = getBrowserType();

function getBrowserType() {
    let ua = navigator.userAgent;
    if ((ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edge") === -1)) {
        return "chrome"
    }
    else if (ua.indexOf("Edge") > -1) {
        return "edge"
    }
    else if (ua.indexOf("Firefox") > -1) {
        return "firefox"
    }
    else if ((ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") === -1)) {
        return "safari"
    }
    else {
        return ""
    }
}

function forbiddenWeb(url) {
    for (let i = 0; i < forbiddenList.length; i++) {
        if (url.indexOf(forbiddenList[i]) !== -1) {
            if (["firefox", "safari"].indexOf(browserType) !== -1) {
                browser.tabs.update({url: "https://unsplash.com"});
            }
            else {
                chrome.tabs.update({url: "https://unsplash.com"});
            }
        }
    }
}

// 新建或修改标签页时检查 url 是否在禁止列表中
if (["firefox", "safari"].indexOf(browserType) !== -1) {
    browser.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
        forbiddenWeb(changeInfo.url);
    });
}
else {
    chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
        forbiddenWeb(changeInfo.url);
    });
}



