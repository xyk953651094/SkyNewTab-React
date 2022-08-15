import {themes} from "./publicConstents"

// 获取日期与时间
export function getTimeDetails(param: Date) {
    let year: string | number = param.getFullYear();
    let month: string | number = param.getMonth() + 1;
    let day: string | number = param.getDate();
    let hour: string | number = param.getHours();
    let minute: string | number = param.getMinutes();
    let second: string | number = param.getSeconds();

    year = year.toString();
    month = month < 10? ('0' + month) : month.toString();
    day = day < 10? ('0' + day) : day.toString();
    hour = hour < 10? ('0' + hour) : hour.toString();
    minute = minute < 10? ('0' + minute) : minute.toString();
    second = second < 10? ('0' + second) : second.toString();

    return {
        year:year, month:month, day:day, hour:hour, minute:minute, second:second,
        showDate: year + "/" + month + "/" + day,
        showTime: hour + ":" + minute
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
        morning: '朝霞满',
        noon: '正当午',
        afternoon: '斜阳下',
        evening: '日暮里',
        night: '见星辰',
        daybreak: '又一宿'
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
    let randomNum = Math.floor(Math.random() * themes.length);
    let body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = themes[randomNum].bodyBackgroundColor;    // 设置body背景颜色

    return themes[randomNum].frostedGlassBackgroundColor;  // 返回各组件背景颜色
}

// 根据图片背景颜色获取元素反色效果
export function getThemeColor(color: string) {
    color = '0x' + color.replace('#', '');
    let newColor = '000000' + (0xFFFFFF - parseInt(color)).toString(16);
    return '#' + newColor.substring(newColor.length-6, newColor.length);
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
            return '#000000';
        } else {
            return '#ffffff';
        }
    }
    else {
       return '#ffffff';
    }
}

// PC端鼠标移动效果
export function mouseMoveEffect() {
    let backgroundImage = document.getElementById('backgroundImage');
    window.addEventListener('mousemove',function(e){
        if(backgroundImage instanceof HTMLElement) {
            backgroundImage.style.transition = '0.5s';
            if (e.movementX > 0 && e.movementY > 0) {
                backgroundImage.style.transform = 'scale(1.05) translate(-0.1%, -0.1%)';
            } else if (e.movementX < 0 && e.movementY > 0) {
                backgroundImage.style.transform = 'scale(1.05) translate(0.1%, -0.1%)';
            } else if (e.movementX > 0 && e.movementY < 0) {
                backgroundImage.style.transform = 'scale(1.05) translate(-0.1%, 0.1%)';
            } else if (e.movementX < 0 && e.movementY < 0) {
                backgroundImage.style.transform = 'scale(1.05) translate(0.1%, 0.1%)';
            }
        }
    });
}

// 判断设备型号
export function deviceModel() {
    let ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > -1) { return 'iPhone' }
    else if(ua.indexOf('iPad') > -1) { return 'iPad' }
    else if(ua.indexOf('Android') > -1) { return 'Android' }
    else { return '' }
}