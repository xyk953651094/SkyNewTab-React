import {lightThemeArray, darkThemeArray, device} from "./publicConstants"
import {message, Modal} from 'antd';
import "jquery-color"
import {ThemeColorInterface} from "./publicInterface";
const $ = require("jquery");
const {confirm} = Modal;

// 获取日期与时间
export function getTimeDetails(param: Date) {
    let year: string | number = param.getFullYear();
    let month: string | number = param.getMonth() + 1;
    let day: string | number = param.getDate();
    let hour: string | number = param.getHours();
    let minute: string | number = param.getMinutes();
    let second: string | number = param.getSeconds();
    let week: string | number = param.getDay();
    let localeDate: string = param.toLocaleString("zh-Hans-u-ca-chinese");

    console.log("week: " + param.getDay())

    year = year.toString();
    month = month < 10? ("0" + month) : month.toString();
    day = day < 10? ("0" + day) : day.toString();
    hour = hour < 10? ("0" + hour) : hour.toString();
    minute = minute < 10? ("0" + minute) : minute.toString();
    second = second < 10? ("0" + second) : second.toString();
    switch (week) {
        case 0: week = "周日"; break;
        case 1: week = "周一"; break;
        case 2: week = "周二"; break;
        case 3: week = "周三"; break;
        case 4: week = "周四"; break;
        case 5: week = "周五"; break;
        case 6: week = "周六"; break;
        default: week = "";
    }

    return {
        year:year, month:month, day:day, hour:hour, minute:minute, second:second,
        showWeek: week,
        showDate: year + "/" + month + "/" + day,
        showDate2: year + "." + month + "." + day,
        showDate3: year + month + day,
        showDate4: year + "年" + month + "月" + day + "日",
        showTime: hour + ":" + minute,
        showLocaleDate: "农历" + localeDate.split(" ")[0] + "日"
    };
}

// 判断字符串是否合规
export function isEmptyString(param: string) {
    return (param === null || param === undefined || param.length === 0);
}

// 根据当前时间段返回问候语
export function getGreet(param: Date) {
    let hour = param.getHours();

    const greets = {
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (hour >=0 && hour < 6) {          // 凌晨
        return greets.daybreak;
    }
    else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    }
    else if (hour >= 11 && hour < 14) {  // 中午
        return greets.noon;
    }
    else if (hour >= 14 && hour < 17) {  // 下午
        return greets.afternoon;
    }
    else if (hour >=17 && hour < 20) {   // 傍晚
        return greets.evening;
    }
    else {                               // 夜晚
        return greets.night;
    }
}

// 获取阳历节日
export function getHoliday(): string {
    let today = new Date();
    let month: number = today.getMonth();
    let day: number = today.getDate();
    if (month === 1 && day === 1) { return "｜元旦节" }
    else if (month === 3 && day === 8) { return "｜妇女节"}
    else if (month === 4 && day === 5) { return "｜清明节"}
    else if (month === 5 && day === 1) { return "｜劳动节"}
    else if (month === 5 && day === 4) { return "｜青年节"}
    else if (month === 6 && day === 1) { return "｜儿童节"}
    else if (month === 8 && day === 1) { return "｜建军节"}
    else if (month === 10 && day === 1) { return "｜国庆节"}
    else return "";
}

export function getChineseHoliday(today: string): string {
    if (today === "正月初一") { return "｜春节"}
    else if (today === "正月十五") { return "｜元宵节"}
    else if (today === "二月初二") { return "｜龙抬头"}
    else if (today === "五月初五") { return "｜端午节"}
    else if (today === "七月初七") { return "｜七夕节"}
    else if (today === "七月十五") { return "｜中元节"}
    else if (today === "八月十五") { return "｜中秋节"}
    else if (today === "九月初九") { return "｜重阳节"}
    else if (today === "腊月初八") { return "｜腊八节"}
    else if (today === "腊月廿四") { return "｜小年"}
    else if (today === "腊月三十") { return "｜除夕"}
    else return ""
}

// 请求unsplash图片前随机显示多彩颜色主题
export function setColorTheme() {
    let hour = new Date().getHours();
    let theme = lightThemeArray;
    if( 18 < hour || hour < 6) {
        theme = darkThemeArray;
    }
    let randomNum = Math.floor(Math.random() * theme.length);
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = theme[randomNum].bodyBackgroundColor;    // 设置body背景颜色

    let returnValue: ThemeColorInterface = {
        "componentBackgroundColor": theme[randomNum].componentBackgroundColor,
        "componentFontColor": getFontColor(theme[randomNum].componentBackgroundColor),
    }
    return returnValue;  // 返回各组件背景颜色
}

// 根据图片背景颜色获取元素反色效果
export function getComponentBackgroundColor(color: string) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length-6, newColor.length);
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
    }
    else {
       return "#ffffff";
    }
}

// Android端与桌面端壁纸动态效果
export function imageDynamicEffect(element: HTMLElement, effectType: string) {
    if (device === "Android") {
        if (window.addEventListener) {
            window.addEventListener("deviceorientation", function () {
                deviceOrientationEvent(element);
            });
        }
    }  else {  // 桌面端
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
                    element.style.transform = "scale(1.05)";
                    break;
                }
            }
        });
    }
}

// iOS端壁纸动态效果
export function iOSImageDynamicEffect(element: HTMLElement) {
    let deviceOrientationPermission = localStorage.getItem('deviceOrientationPermission');
    if (deviceOrientationPermission === "granted") {
        (DeviceOrientationEvent as any).requestPermission().then(function (status: string) {
            if (status === "granted") {
                deviceOrientationEvent(element);
            }
        }).catch(function () {
            message.error("权限错误");
        });
    }
    else {
        confirm({
            title: "提示",
            icon: "",
            content: "授予访问权限以提升视觉效果",
            onOk() {
                (DeviceOrientationEvent as any).requestPermission().then(function (status: string) {
                    if (status === "granted") {
                        deviceOrientationEvent(element);
                        localStorage.setItem("deviceOrientationPermission", "granted");
                    }
                }).catch(function () {
                    message.error("权限错误");
                });
            },
            onCancel() {},
        });
    }
}

// 移动端陀螺仪
function deviceOrientationEvent(element: HTMLElement) {
    window.addEventListener("deviceorientation", function (event:any) {
        // let rotateX = (event.beta / 10).toFixed(2);       // 调整精度
        // let rotateY = (-event.gamma / 10).toFixed(2);     // 调整精度
        let translateX = (-event.gamma / 10).toFixed(2);  // 调整精度
        let translateY = (event.beta / 10).toFixed(2);    // 调整精度

        element.style.transition = "0.3s";
        element.style.transform = "scale(1.05, 1.05) " +
            // "rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg) " +
            "translate(" + translateX + "%, " + translateY + "%)";
    });
}

// 判断设备型号
export function getDevice() {
    let ua = navigator.userAgent;
    if(ua.indexOf("iPhone") > -1) { return "iPhone" }
    else if(ua.indexOf("iPad") > -1) { return "iPad" }
    else if(ua.indexOf("Android") > -1) { return "Android" }
    else { return "" }
}

// 过渡动画
export function changeThemeColor(element: string, backgroundColor: string, fontColor: string, time: number = 300) {
    $(element).animate({
        backgroundColor: backgroundColor,
        color: fontColor,
    }, time);
}

export function fadeIn(element: string, time = 300) {
    $(element).fadeIn(time);
}

export function fadeOut(element: string, time = 300) {
    $(element).fadeOut(time);
}