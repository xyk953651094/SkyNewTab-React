import {PreferenceDataInterface} from './publicInterface'
import {getDevice} from "./publicFunctions";

export let themeArray = [
    {"bodyBackgroundColor": "#FAEFDE", "componentBackgroundColor": "#E42D44"},
    {"bodyBackgroundColor": "#E42D44", "componentBackgroundColor": "#FAEFDE"},
    {"bodyBackgroundColor": "#E5D7AD", "componentBackgroundColor": "#614F4D"},
    {"bodyBackgroundColor": "#614F4D", "componentBackgroundColor": "#E5D7AD"},
    {"bodyBackgroundColor": "#5B3663", "componentBackgroundColor": "#FFD800"},
    {"bodyBackgroundColor": "#343130", "componentBackgroundColor": "#FF7900"},
    {"bodyBackgroundColor": "#EDB04C", "componentBackgroundColor": "#8A3C48"},
    {"bodyBackgroundColor": "#8A3C48", "componentBackgroundColor": "#EDB04C"},
    {"bodyBackgroundColor": "#A0C198", "componentBackgroundColor": "#535E4B"},
    {"bodyBackgroundColor": "#535E4B", "componentBackgroundColor": "#A0C198"},
    {"bodyBackgroundColor": "#CFA33E", "componentBackgroundColor": "#262424"},
    {"bodyBackgroundColor": "#262424", "componentBackgroundColor": "#CFA33E"},
    {"bodyBackgroundColor": "#D23538", "componentBackgroundColor": "#36527D"},
    {"bodyBackgroundColor": "#36527D", "componentBackgroundColor": "#D23538"},
    {"bodyBackgroundColor": "#F7F2ED", "componentBackgroundColor": "#8D587E"},
    {"bodyBackgroundColor": "#8D587E", "componentBackgroundColor": "#F7F2ED"},

    {"bodyBackgroundColor": "#FD454A", "componentBackgroundColor": "#FCBE23"},
    {"bodyBackgroundColor": "#4C3C36", "componentBackgroundColor": "#7CAC67"},
    {"bodyBackgroundColor": "#7CAC67", "componentBackgroundColor": "#4C3C36"},
    {"bodyBackgroundColor": "#013372", "componentBackgroundColor": "#C9AB70"},
    {"bodyBackgroundColor": "#C9AB70", "componentBackgroundColor": "#013372"},
    {"bodyBackgroundColor": "#F4EEE6", "componentBackgroundColor": "#362228"},
    {"bodyBackgroundColor": "#362228", "componentBackgroundColor": "#F4EEE6"},
    {"bodyBackgroundColor": "#C92C35", "componentBackgroundColor": "#044091"},
    {"bodyBackgroundColor": "#A2DDB8", "componentBackgroundColor": "#F6F2EB"},
    {"bodyBackgroundColor": "#F6F2EB", "componentBackgroundColor": "#A2DDB8"},
    {"bodyBackgroundColor": "#7F8284", "componentBackgroundColor": "#FFCE56"},
    {"bodyBackgroundColor": "#6D8158", "componentBackgroundColor": "#245776"},
    {"bodyBackgroundColor": "#245776", "componentBackgroundColor": "#6D8158"},
    {"bodyBackgroundColor": "#CEBECE", "componentBackgroundColor": "#EFF2FA"},
    {"bodyBackgroundColor": "#EFF2FA", "componentBackgroundColor": "#CEBECE"},
    {"bodyBackgroundColor": "#DCB28C", "componentBackgroundColor": "#474361"},
    {"bodyBackgroundColor": "#474361", "componentBackgroundColor": "#DCB28C"},
    {"bodyBackgroundColor": "#50543B", "componentBackgroundColor": "#FFE7B6"},
    {"bodyBackgroundColor": "#FFE7B6", "componentBackgroundColor": "#50543B"},
];

export let defaultPreferenceData: PreferenceDataInterface = {
    searchEngine: "bing",
    dynamicEffect: "all",
    imageQuality: "regular",
    imageTopics: ["bo8jQKTaE0Y"],
    customTopic: "",
    nightMode: false,
    simpleMode: false,
    noImageMode: false,
    displayAlert: true,
    buttonShape: "round"
}

// 常用变量
export let device = getDevice();  // 获取当前设备类型
export let clientId = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";
export let unsplashUrl = "?utm_source=SkyNewTab&utm_medium=referral";  // Unsplash API规范
