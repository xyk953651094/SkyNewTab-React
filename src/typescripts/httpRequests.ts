import {deviceModel} from "./publicFunctions";
import {clientId} from "./publicConstents";

export function getUnsplashImage () {
    let device = deviceModel();
    let orientation = "landscape";
    if(device === "iPhone" || device === "Android") {
        orientation = "portrait";  // 获取竖屏图片
    }
    let topics = "bo8jQKTaE0Y,6sMVjTLSkeQ,bDo48cUhwnY,xHxYTMHLgOc,iUIsnVtjB0Y,R_Fyn-Gwtlw,Fzo3zuOHN6w";
    let url = "https://api.unsplash.com/photos/random?" +
        "client_id=" + clientId +
        "&orientation=" + orientation +
        "&topics=" + topics +
        "&content_filter=high";

    return httpRequestGet(url);
}

function httpRequestGet(url: string) {
    let response: any = null;
    let getXHR = new XMLHttpRequest();
    getXHR.open("GET", url, false);
    getXHR.onload = function () {
        if (getXHR.status === 200) {
            response = JSON.parse(getXHR.responseText);
        }
        else {}
    }
    getXHR.onerror = function () {}
    getXHR.send();
    return response;
}