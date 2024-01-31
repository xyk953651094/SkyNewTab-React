/* global chrome */  /* 加上这行才能使用 chrome */
/* global browser */
function getBrowserType() {
    let userAgent = navigator.userAgent;
    let browser='Other';
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Safari') !== -1){
        browser="Chrome";
    }
    else if (userAgent.indexOf('Edge') !== -1){
        browser="Edge";
    }
    else if (userAgent.indexOf('Firefox') !== -1){
        browser = "Firefox";
    }
    else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1){
        browser="Safari";
    }
    return browser;
}

function forbiddenWeb(url) {
    if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
        chrome.storage.local.get(["focusMode", "focusFilter", "filterList"]).then((result) => {
            let focusMode = result.focusMode;
            let focusFilter = result.focusFilter;
            let filterList = result.filterList;
            if (focusMode === true && filterList !== null) {
                // 白名单模式
                if (focusFilter === "whiteListFilter") {
                    if (filterList.length === 0) {
                        chrome.tabs.update({url: browserType + "://newtab"});
                    } else if (filterList.length > 0) {
                        let isInWhiteList = false;
                        for (let i = 0; i < filterList.length; i++) {
                            if (url.indexOf(filterList[i].domain) !== -1) {
                                isInWhiteList = true;
                            }
                        }

                        if (isInWhiteList === false) {
                            chrome.tabs.update({url: browserType + "://newtab"});
                        }
                    }
                }
                // 黑名单模式
                else if (focusFilter === "blackListFilter") {
                    if (filterList.length > 0) {
                        let isInBlackList = false;
                        for (let i = 0; i < filterList.length; i++) {
                            if (url.indexOf(filterList[i].domain) !== -1) {
                                isInBlackList = true;
                            }
                        }

                        if (isInBlackList === true) {
                            chrome.tabs.update({url: browserType + "://newtab"});
                        }
                    }
                }
            }
        });
    }
    else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
        browser.storage.local.get(["focusMode", "focusFilter", "filterList"]).then((result) => {
            let focusMode = result.focusMode;
            let focusFilter = result.focusFilter;
            let filterList = result.filterList;
            if (focusMode === true && filterList !== null) {
                // Firefox 和 Safari 暂不支持白名单模式
                // 黑名单模式
                if (focusFilter === "blackListFilter") {
                    if (filterList.length > 0) {
                        let isInBlackList = false;
                        for (let i = 0; i < filterList.length; i++) {
                            if (url.indexOf(filterList[i].domain) !== -1) {
                                isInBlackList = true;
                            }
                        }

                        if (isInBlackList === true) {
                            browser.tabs.update({url: "./mainPage.html"});
                        }
                    }
                }
            }
        });
    }
}

const browserType = getBrowserType();
if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
    chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
        if(changeInfo.url) {
            forbiddenWeb(changeInfo.url);
        }
    });
}
else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
    browser.tabs.onUpdated.addListener(
        function (tabID, changeInfo, tab) {
            if(changeInfo.url) {
                forbiddenWeb(changeInfo.url);
            }
        }
    )
}
else {
    console.log("该功能不支持当前的浏览器，请使用 Chrome、Edge、Firefox、Safari")
}