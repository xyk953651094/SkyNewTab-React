import {lightThemeArray, darkThemeArray} from "./publicConstents"
import "jquery-color"
const $ = require("jquery");

// 获取日期与时间
export function getTimeDetails(param: Date) {
    let year: string | number = param.getFullYear();
    let month: string | number = param.getMonth() + 1;
    let day: string | number = param.getDate();
    let hour: string | number = param.getHours();
    let minute: string | number = param.getMinutes();
    let second: string | number = param.getSeconds();
    let week: string | number = param.getDay() + 1;
    let localeDate: string = param.toLocaleString("zh-Hans-u-ca-chinese");

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

    return theme[randomNum].frostedGlassBackgroundColor;  // 返回各组件背景颜色
}

// 根据图片背景颜色获取元素反色效果
export function getThemeColor(color: string) {
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

// PC端鼠标移动效果
export function mouseMoveEffect(effectType: string) {
    // @ts-ignore
    let backgroundImageDiv: HTMLElement = document.getElementById("backgroundImage");
    backgroundImageDiv.style.perspective = "500px";
    // @ts-ignore
    let backgroundImage: HTMLElement = backgroundImageDiv.children[0];

    // // @ts-ignore
    // let backgroundImage: any = document.getElementById("backgroundImage").children[0];

    window.addEventListener("mousemove",function(e){
        let mouseX = e.screenX;
        let mouseY = e.screenY;
        let screenWidth = document.body.clientWidth;
        let screenHeight = document.body.clientHeight;
        let screenMidWidth = screenWidth / 2;
        let screenMidHeight = screenHeight / 2;
        let relatedX = mouseX - screenMidWidth;
        let relatedY = mouseY - screenMidHeight;
        let relatedXRatio = Math.abs(relatedX / screenMidWidth / 3).toFixed(2);   // 大于0则在屏幕右边，小于0则在屏幕左边
        let relatedYRatio = Math.abs(relatedY / screenMidHeight / 3).toFixed(2);  // 大于0则在屏幕下边，小于0则在屏幕上边

        backgroundImage.style.transition = "0.1s";
        if (backgroundImage instanceof HTMLElement) {
            switch (effectType) {
                case "translate":
                    if (relatedX < 0 && relatedY < 0) {         // 左上角
                        backgroundImage.style.transform = "scale(1.05) translate(" + relatedXRatio + "%, " + relatedYRatio + "%)";
                    } else if (relatedX > 0 && relatedY < 0) {  // 右上角
                        backgroundImage.style.transform = "scale(1.05) translate(" + (-relatedXRatio) + "%, " + (-relatedYRatio) + "%)";
                    } else if (relatedX > 0 && relatedY > 0) {  // 右下角
                        backgroundImage.style.transform = "scale(1.05) translate(" + (-relatedXRatio) + "%, " + (-relatedYRatio) + "%)";
                    } else if (relatedX < 0 && relatedY > 0) {  // 左下角
                        backgroundImage.style.transform = "scale(1.05) translate(" + relatedXRatio + "%, " + (-relatedYRatio) + "%)";
                    }
                    break;
                case "rotate":
                    if (relatedX < 0 && relatedY < 0) {          // 左上角
                        backgroundImage.style.transform = "scale(1.05) rotateX(" + relatedXRatio + "deg) rotateY(" + (-relatedYRatio) + "deg)";
                    } else if (relatedX > 0 && relatedY < 0) {  // 右上角
                        backgroundImage.style.transform = "scale(1.05) rotateX(" + relatedXRatio + "deg) rotateY(" + relatedYRatio + "deg)";
                    } else if (relatedX > 0 && relatedY > 0) {  // 右下角
                        backgroundImage.style.transform = "scale(1.05) rotateX(" + (-relatedXRatio) + "deg) rotateY(" + relatedYRatio + "deg)";
                    } else {                                    // 左下角
                        backgroundImage.style.transform = "scale(1.05) rotateX(" + (-relatedXRatio) + "deg) rotateY(" + (-relatedYRatio) + "deg)";
                    }
                    break;
                case "close":
                    backgroundImage.style.transform = "scale(1.05)";
                    break;
            }
        }
    });
}

// 判断设备型号
export function deviceModel() {
    let ua = navigator.userAgent;
    if(ua.indexOf("iPhone") > -1) { return "iPhone" }
    else if(ua.indexOf("iPad") > -1) { return "iPad" }
    else if(ua.indexOf("Android") > -1) { return "Android" }
    else { return "" }
}

// 过渡动画
export function changeThemeColor(element: string, backgroundColor: string, time: number = 500) {
    $(element).animate({
        backgroundColor: backgroundColor,
        color: getFontColor(backgroundColor),
    }, time);
}

export function fadeIn(element: string, time = 300) {
    $(element).fadeIn(time);
}

export function fadeOut(element: string, time = 300) {
    $(element).fadeOut(time);
}