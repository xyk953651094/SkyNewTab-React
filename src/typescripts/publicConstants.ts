import {PreferenceDataInterface} from './publicInterface'
import {getBrowserType, getDevice} from "./publicFunctions";

export const lightColors: string[] = [
    // "#A04F3C",
    // "#A0875A",
    // "#A08C9F",
    // "#A35842",
    // "#A55456",
    // "#A6845A",
    // "#AB8483",
    // "#AFC5C1",
    "#B19BA7",
    "#B1C5BA",
    "#B3C5AB",
    "#B49082",
    "#B8E8EB",
    "#B95D61",
    "#B9B0A1",
    "#BEB49B",
    "#C88D52",
    "#C9C7C5",
    "#CB8098",
    "#CCC4B3",
    "#CF9A8C",
    "#D3CFCA",
    "#D4DFBB",
    "#D4E1DA",
    "#D8C0A0",
    "#DAD3C7",
    "#DD94A1",
    "#DEB8B3",
    "#E1DAD8",
    "#E4CE84",
    "#E6C380",
    "#ECE2C6",
    "#F1EADC",
    "#F2EEE8",
    "#F7F7EB",
    "#FFE19A",
]

export const darkColors: string[] = [
    "#0E31A0",
    "#141F49",
    "#1A4D80",
    "#1F284C",
    "#3070A4",
    "#313A44",
    "#33415D",
    "#39364C",
    "#3A3E47",
    "#493C53",
    "#493F36",
    "#4F473A",
    "#51433F",
    "#504E4A",
    "#541831",
    "#547C97",
    "#665A4E",
    "#67363D",
    "#67A1C4",
    "#6E8E7C",
    "#70846A",
    "#745B9F",
    "#75706C",
    "#761521",
    // "#911D50",
    // "#91955F",
    // "#979AB9",
    // "#9B8A9D",
    // "#9E754E",
]

export let defaultPreferenceData: PreferenceDataInterface = {
    dynamicEffect: "close",
    imageQuality: "full",
    imageTopics: ["bo8jQKTaE0Y"],
    customTopic: "",
    changeImageTime: "3600000",
    nightMode: true,
    noImageMode: false,

    searchEngine: "bing",
    buttonShape: "default",
    simpleMode: false,
    accessKey: ""
}

export let imageTopics = [
    "Fzo3zuOHN6w",
    "bo8jQKTaE0Y",
    "CDwuwXJAbEw",
    "iUIsnVtjB0Y",
    "qPYsDzvJOYc",
    "rnSKDHwwYUk",
    "6sMVjTLSkeQ",
    "aeu6rL-j6ew",
    "S4MKLAsBB74",
    "hmenvQhUmxM",
    "xjPR4hlkBGA",
    "_hb-dl4Q-4U",
    "towJZFskpGg",
    "R_Fyn-Gwtlw",
    "xHxYTMHLgOc",
    "Jpg6Kidl-Hk",
    "_8zFHuhRhyo",
    "bDo48cUhwnY",
    "dijpbw99kQQ",
    "Bn-DjrcBrwo"
]

// 常用变量
export const device = getDevice();  // 获取当前设备类型
export const browserType = getBrowserType();
export const colorRegExp = /^#[0-9A-Fa-f]{6}$/;
export const clientId = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";
export const unsplashUrl = "?utm_source=SkyNewTab&utm_medium=referral";  // Unsplash API规范
export const imageHistoryMaxSize = 5;
