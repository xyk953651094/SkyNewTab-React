/* global chrome */  /* 加上这行才能使用 chrome */
/* global browser */
function getBrowserType() {
    const userAgent = navigator.userAgent;

    const browserDetection = {
        "Chrome": userAgent.includes("Chrome") && userAgent.includes("Safari") && !userAgent.includes("Edg"),
        "Edge": userAgent.includes("Edg"),
        "Firefox": userAgent.includes("Firefox"),
        "Safari": !userAgent.includes("Chrome") && userAgent.includes("Safari"),
    };

    for (const browser in browserDetection) {
        if (browserDetection[browser]) {
            return browser;
        }
    }
    return "Other";
}
const browserType = getBrowserType();

function checkAndRedirect(storageAPI, url, tabUpdateURL) {
    return new Promise((resolve, reject) => {
        storageAPI.get(["focusMode", "filterList", "focusEndTimeStamp"]).then((result) => {
            const { focusMode, filterList, focusEndTimeStamp } = result;
            if (focusMode === true && Array.isArray(filterList) && filterList.length > 0) {
                if (focusEndTimeStamp === 0 || (focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp)) {
                    if (isUrlInBlacklist(url, filterList)) {
                        storageAPI.set({ lastBlockedUrl: url }).catch(reject);
                        chrome.tabs.update(tabUpdateURL);
                        resolve();
                    }
                }
            }
            resolve();
        }).catch(reject);
    });
}

function isUrlInBlacklist(url, filterList) {
    for (const item of filterList) {
        if (url.indexOf(item.domain) !== -1) {
            return true;
        }
    }
    return false;
}

function forbiddenWeb(url) {
    if (["Chrome", "Edge"].includes(browserType)) {
        checkAndRedirect(chrome.storage.local, url, { url: browserType + "://newtab" })
            .catch((err) => console.error("Error processing request for Chrome/Edge:", err));
    } else if (["Firefox", "Safari"].includes(browserType)) {
        checkAndRedirect(browser.storage.local, url, { url: "./mainPage.html" })
            .catch((err) => console.error("Error processing request for Firefox/Safari:", err));
    }
}

// 统一的事件监听器回调函数
function tabUpdatedListener(tabID, changeInfo, tab) {
    if (changeInfo.url) {
        try {
            // 对URL进行简单的格式验证
            const validUrl = new URL(changeInfo.url);
            forbiddenWeb(validUrl.href);
        } catch (error) {
            console.error("处理URL时发生错误：", error);
        }
    }
}

// 根据浏览器类型选择正确的API来附加监听器
function attachTabListener() {
    if (["Chrome", "Edge"].includes(browserType)) {
        chrome.tabs.onUpdated.addListener(tabUpdatedListener);
    } else if (["Firefox", "Safari"].includes(browserType)) {
        browser.tabs.onUpdated.addListener(tabUpdatedListener);
    } else {
        console.log("该功能不支持当前的浏览器，请使用 Chrome、Edge、Firefox、Safari");
    }
}

// 调用函数以附加监听器
attachTabListener();