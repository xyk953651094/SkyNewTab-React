import {darkThemeArray, defaultPreferenceData, lightThemeArray} from "./publicConstants"
import "jquery-color"
import {PreferenceDataInterface, ThemeColorInterface} from "./publicInterface";

import $ from "jquery";
import {CheckboxValueType} from "antd/es/checkbox/Group";

// 网络请求
export async function httpRequest(headers: object, url: string, data: object, method: "GET" | "POST") {
    // 验证输入数据
    if (!headers || typeof headers !== "object") {
        throw new Error("Invalid headers");
    }
    if (!url) {
        throw new Error("Invalid URL");
    }
    if (!data || typeof data !== "object") {
        throw new Error("Invalid data");
    }

    return new Promise(function (resolve, reject) {
        // 显式地拒绝不支持的HTTP方法
        if (method !== "GET" && method !== "POST") {
            reject(new Error("Unsupported HTTP method"));
            return;
        }

        $.ajax({
            headers: headers,
            url: url,
            type: method,
            data: data,
            timeout: 5000,
            success: (resultData: any) => {
                resolve(resultData);
            },
            error: function (xhr: any, status: string, error: string) {
                const errorMsg = `Request failed: ${status} ${error}`;
                reject(new Error(errorMsg)); // 提供详细的错误信息
            }
        });
    })
}

// 获取日期与时间
export function getTimeDetails(param: Date) {
    if (!(param instanceof Date) || isNaN(param.getTime())) {
        throw new Error("Invalid Date provided.");
    }

    // 辅助函数，用于将数字格式化为两位字符串
    function formatNumber(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    const year = param.getFullYear().toString();
    const month = formatNumber(param.getMonth() + 1);
    const day = formatNumber(param.getDate());
    const hour = formatNumber(param.getHours());
    const minute = formatNumber(param.getMinutes());
    const second = formatNumber(param.getSeconds());
    const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][param.getDay()];

    const localeDate: string = "农历" + param.toLocaleString("zh-Hans-u-ca-chinese").split(" ")[0] + "日";

    return {
        year, month, day, hour, minute, second,
        showWeek: week,
        showDate: `${year}/${month}/${day}`,
        showDate2: `${year}.${month}.${day}`,
        showDate3: `${year}${month}${day}`,
        showDate4: `${year}年${month}月${day}日`,
        showDate5: `${year}-${month}-${day}`,
        showTime: `${hour}:${minute}`,
        showDetail: `${year}/${month}/${day} ${hour}:${minute}:${second}`,
        showLocaleDate: `${localeDate}`
    };
}

// 判断字符串是否合规
export function isEmpty(param: any) {
    return (param === null || param === undefined || param.length === 0);
}

// 根据当前时间段返回问候语
export function getGreetContent() {
    let hour = new Date().getHours();

    const greets = {
        default: "您好",
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (isNaN(hour)) {
        return greets.default;
    } else if (hour >= 0 && hour < 6) {           // 凌晨
        return greets.daybreak;
    } else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    } else if (hour >= 11 && hour < 13) {  // 中午
        return greets.noon;
    } else if (hour >= 13 && hour < 17) {  // 下午
        return greets.afternoon;
    } else if (hour >= 17 && hour < 19) {  // 傍晚
        return greets.evening;
    } else {                               // 夜晚
        return greets.night;
    }
}

// 获取问候语图标 className
export function getGreetIcon() {
    let hour = new Date().getUTCHours();

    if (isNaN(hour)) {
        return "";
    } else if (hour >= 6 && hour < 12) {   // 上午
        return "bi bi-sunrise";
    } else if (hour >= 12 && hour < 18) {  // 下午
        return "bi bi-sunset";
    } else {                               // 夜晚
        return "bi bi-moon-stars";
    }
}

// 获取天气图标className
export function getWeatherIcon(weatherInfo: string) {
    interface IconMapInterface {
        "晴": string;
        "阴": string;
        "云": string;
        "雨": string;
        "雾": string;
        "霾": string;
        "雪": string;
        "雹": string;
        [key: string]: string; // 添加字符串索引签名
    }

    const iconMap: IconMapInterface = {
        "晴": "bi bi-sun",
        "阴": "bi bi-cloud",
        "云": "bi bi-clouds",
        "雨": "bi bi-cloud-rain",
        "雾": "bi bi-cloud-fog",
        "霾": "bi bi-cloud-haze",
        "雪": "bi bi-cloud-snow",
        "雹": "bi bi-cloud-hail",
    };

    // 构建正则表达式，以匹配映射中的天气情况
    const regex = new RegExp(Object.keys(iconMap).join("|"));
    // 在天气信息中寻找匹配的天气情况
    const match = weatherInfo.match(regex);

    // 如果找到匹配项，返回相应的图标类；否则返回空字符串
    return match ? iconMap[match[0]] : "";
}

// 请求unsplash图片前随机显示多彩颜色主题
export function setColorTheme() {
    let currentHour = parseInt(getTimeDetails(new Date()).hour);
    let themeArray = lightThemeArray;
    if (currentHour > 18 || currentHour < 6) {  // 夜间显示深色背景
        themeArray = darkThemeArray;
    }

    // 确保 themeArray 是有效的数组
    if (!themeArray || !Array.isArray(themeArray) || themeArray.length === 0) {
        throw new Error('Invalid themeArray.');
    }

    let randomNum = Math.floor(Math.random() * themeArray.length);
    let body = document.getElementsByTagName("body")[0];
    if (body) {
        body.style.backgroundColor = themeArray[randomNum].bodyBackgroundColor;    // 设置body背景颜色
    } else {
        console.error('Unable to find the <body> element.');
    }

    let returnValue: ThemeColorInterface = {
        "themeColor": themeArray[randomNum].bodyBackgroundColor,
        "componentBackgroundColor": themeArray[randomNum].componentBackgroundColor,
        "componentFontColor": getFontColor(themeArray[randomNum].componentBackgroundColor),
    }
    return returnValue;  // 返回各组件背景颜色
}

// 根据图片背景颜色获取元素反色效果
export function getReverseColor(color: string) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length - 6, newColor.length);
}

// 根据图片背景颜色改变字体颜色效果
export function getFontColor(color: string) {
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (rgb) {
        let r = parseInt(rgb[1], 16);
        let g = parseInt(rgb[2], 16);
        let b = parseInt(rgb[3], 16);
        let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        if (gray > 128) {
            return "#000000";
        } else {
            return "#ffffff";
        }
    } else {
        return "#ffffff";
    }
}

// 桌面端壁纸动态效果
export function imageDynamicEffect(element: HTMLElement, effectType: string) {
    window.addEventListener("mousemove", function (e) {
        let mouseX = e.screenX;
        let mouseY = e.screenY;
        let screenWidth = document.body.clientWidth;
        let screenHeight = document.body.clientHeight;
        let screenMidWidth = screenWidth / 2;
        let screenMidHeight = screenHeight / 2;
        let relatedX = mouseX - screenMidWidth;   // 大于0则在屏幕右边，小于0则在屏幕左边
        let relatedY = mouseY - screenMidHeight;  // 大于0则在屏幕下边，小于0则在屏幕上边
        let relatedXRatio = relatedX / screenMidWidth;
        let relatedYRatio = relatedY / screenMidHeight;

        element.style.transition = "0.3s";
        switch (effectType) {
            case "translate": {
                let translateX = (-relatedXRatio / 4).toFixed(2);  // 调整精度
                let translateY = (-relatedYRatio / 4).toFixed(2);  // 调整精度
                element.style.transform = "scale(1.05, 1.05) translate(" + translateX + "%, " + translateY + "%)";
                break;
            }
            case "rotate": {
                let rotateX = (relatedXRatio / 4).toFixed(2);      // 调整精度
                let rotateY = (-relatedYRatio / 4).toFixed(2);     // 调整精度
                element.style.transform = "scale(1.05, 1.05) rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg)";
                break;
            }
            case "all": {
                let skewX = (relatedXRatio / 10).toFixed(2);       // 调整精度
                let rotateX = (relatedXRatio / 2).toFixed(2);      // 调整精度
                let rotateY = (-relatedYRatio / 2).toFixed(2);     // 调整精度
                let translateX = (-relatedXRatio / 2).toFixed(2);  // 调整精度
                let translateY = (-relatedYRatio / 2).toFixed(2);  // 调整精度
                element.style.transform = "scale(1.05, 1.05) " +
                    "skew(" + skewX + "deg)" +
                    "rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg) " +
                    "translate(" + translateX + "%, " + translateY + "%)";
                break;
            }
            case "close": {
                element.style.transform = "scale(1.05, 1.05)";
                break;
            }
        }
    });
}

// 判断设备型号
export function getDevice() {
    let ua = navigator.userAgent;
    if (ua.indexOf("iPhone") > -1) {
        return "iPhone"
    } else if (ua.indexOf("iPad") > -1) {
        return "iPad"
    } else if (ua.indexOf("Android") > -1) {
        return "Android"
    } else {
        return ""
    }
}

export function getBrowserType() {
    let userAgent = navigator.userAgent;
    let browser="Other";
    if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Safari") !== -1){
        browser="Chrome";
    }
    else if (userAgent.indexOf("Edge") !== -1){
        browser="Edge";
    }
    else if (userAgent.indexOf("Firefox") !== -1){
        browser = "Firefox";
    }
    else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1){
        browser="Safari";
    }
    return browser;
}

export function getSearchEngineDetail(searchEngine: string) {
    let searchEngineName: string;
    let searchEngineValue: string;
    let searchEngineUrl: string;
    switch (searchEngine) {
        case "bing":
            searchEngineName = "必应";
            searchEngineValue = "bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            break;
        case "google":
            searchEngineName = "谷歌";
            searchEngineValue = "google";
            searchEngineUrl = "https://www.google.com/search?q=";
            break;
        default:
            searchEngineName = "必应";
            searchEngineValue = "bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            break;
    }
    return {
        "searchEngineName": searchEngineName,
        "searchEngineValue": searchEngineValue,
        "searchEngineUrl": searchEngineUrl,
    };
}

// 补全设置数据
export function fixPreferenceData(preferenceData: PreferenceDataInterface) {
    let isFixed = false;

    if (!preferenceData.dynamicEffect) {
        preferenceData.dynamicEffect = defaultPreferenceData.dynamicEffect;
        isFixed = true;
    }
    if (!preferenceData.imageQuality) {
        preferenceData.imageQuality = defaultPreferenceData.imageQuality;
        isFixed = true;
    }
    if (!preferenceData.imageTopics) {
        preferenceData.imageTopics = defaultPreferenceData.imageTopics;
        isFixed = true;
    }
    if (preferenceData.customTopic === undefined || preferenceData.customTopic === null) {  // customTopic 可以为""
        preferenceData.customTopic = defaultPreferenceData.customTopic;
        isFixed = true;
    }
    if (!preferenceData.changeImageTime) {
        preferenceData.changeImageTime = defaultPreferenceData.changeImageTime;
        isFixed = true;
    }
    if (preferenceData.nightMode === undefined || preferenceData.nightMode === null) {
        preferenceData.nightMode = defaultPreferenceData.nightMode;
        isFixed = true;
    }
    if (preferenceData.noImageMode === undefined || preferenceData.noImageMode === null) {
        preferenceData.noImageMode = defaultPreferenceData.noImageMode;
        isFixed = true;
    }

    if (!preferenceData.searchEngine) {
        preferenceData.searchEngine = defaultPreferenceData.searchEngine;
        isFixed = true;
    }
    if (!preferenceData.buttonShape) {
        preferenceData.buttonShape = defaultPreferenceData.buttonShape;
        isFixed = true;
    }
    if (preferenceData.simpleMode === undefined || preferenceData.simpleMode === null) {
        preferenceData.simpleMode = defaultPreferenceData.simpleMode;
        isFixed = true;
    }
    if (preferenceData.accessKey === undefined || preferenceData.accessKey === null) {
        preferenceData.accessKey = defaultPreferenceData.accessKey;
        isFixed = true;
    }

    if (isFixed) {
        localStorage.setItem("preferenceData", JSON.stringify(preferenceData));  // 重新保存设置
    }
    return preferenceData;
}

export function getPreferenceDataStorage() {
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        return defaultPreferenceData;
    } else {
        return fixPreferenceData(JSON.parse(tempPreferenceData));  // 检查是否缺少数据
    }
}

export function getImageHistoryStorage() {
    let imageHistoryStorage = localStorage.getItem("imageHistory");
    if (imageHistoryStorage !== null) {
        let tempImageHistoryJson = JSON.parse(imageHistoryStorage);
        if (!isEmpty(tempImageHistoryJson)) {
            return tempImageHistoryJson.reverse();  // 重新到旧排序
        } else {
            return [];
        }
    } else {
        return [];
    }
}

// 过渡动画
export function changeThemeColor(element: string, backgroundColor: string, fontColor: string, time: number = 300) {
    $(element).animate({
        backgroundColor: backgroundColor,
        color: fontColor,
    }, {queue: false, duration: time});
}

export function fadeIn(element: string, time = 300) {
    $(element).fadeIn(time);
}

export function fadeOut(element: string, time = 300) {
    $(element).fadeOut(time);
}

// 按钮（clockComponent 不适用公共方法，已单独实现）
export function btnMouseOver(hoverColor: string, e: any) {
    e.currentTarget.style.backgroundColor = hoverColor;
    e.currentTarget.style.color = getFontColor(hoverColor);
}

export function btnMouseOut(fontColor: string, e: any) {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = fontColor;
}

// 修改菜单栏表单控件时变化主题颜色
export function resetRadioColor(selectedRadio: string | undefined, allRadios: string[], themeColor: string) {
    // 重置所有不是当前选中的选项的颜色
    for (let i = 0; i < allRadios.length; i++) {
        let currentRadio = $("#" + allRadios[i]);
        if (selectedRadio && allRadios[i] !== selectedRadio) {
            currentRadio.next().css({ "borderColor": "#d9d9d9", "backgroundColor": "#ffffff" });
            currentRadio.parent().next().css({"fontWeight": "normal", "textDecoration": "none"});
        }
        else {
            currentRadio.next().css({ "borderColor": themeColor, "backgroundColor": themeColor, });
            currentRadio.parent().next().css({"fontWeight": "bold", "textDecoration": "underline"});
        }
    }
}

export function resetCheckboxColor(selectedCheckboxes: CheckboxValueType[], allCheckboxes: string[], themeColor: string) {
    // 重置所有不是当前选中的选项的颜色
    for (let i = 0; i < allCheckboxes.length; i++) {
        let currentCheckbox = $("#" + allCheckboxes[i]);
        if (selectedCheckboxes.indexOf(allCheckboxes[i]) === -1) {
            currentCheckbox.next().css({ "borderColor": "#d9d9d9", "backgroundColor": "#ffffff" });
            currentCheckbox.parent().next().css({"fontWeight": "normal", "textDecoration": "none"});
        }
        else {
            currentCheckbox.next().css({ "borderColor": themeColor, "backgroundColor": themeColor});
            currentCheckbox.parent().next().css({"fontWeight": "bold", "textDecoration": "underline"});
        }
    }
}

export function resetSwitchColor(element: string, checked: boolean, themeColor: string) {
    if (!checked) {
        $(element).children(".ant-switch-inner").css("backgroundColor", "rgb(0, 0, 0, 0)");
    }
    else {
        $(element).children(".ant-switch-inner").css("backgroundColor", themeColor);
    }
}