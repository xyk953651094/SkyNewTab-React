import {PreferenceDataInterface} from './publicInterface'
import {getDevice} from "./publicFunctions";

export let lightThemeArray = [
    {"bodyBackgroundColor": "#F2EEE8", "componentBackgroundColor": "#9B8A9D"},
    {"bodyBackgroundColor": "#DD94A1", "componentBackgroundColor": "#39364C"},
    {"bodyBackgroundColor": "#91955F", "componentBackgroundColor": "#493F36"},
    {"bodyBackgroundColor": "#B3C5AB", "componentBackgroundColor": "#4F473A"},
    {"bodyBackgroundColor": "#CF9A8C", "componentBackgroundColor": "#A04F3C"},
    {"bodyBackgroundColor": "#AFC5C1", "componentBackgroundColor": "#665A4E"},
    {"bodyBackgroundColor": "#B9B0A1", "componentBackgroundColor": "#75706C"},
    {"bodyBackgroundColor": "#745B9F", "componentBackgroundColor": "#141F49"},
    {"bodyBackgroundColor": "#B19BA7", "componentBackgroundColor": "#3A3E47"},
    {"bodyBackgroundColor": "#BEB49B", "componentBackgroundColor": "#504E4A"},
    {"bodyBackgroundColor": "#70846A", "componentBackgroundColor": "#504E4A"},
    {"bodyBackgroundColor": "#A6845A", "componentBackgroundColor": "#504E4A"},
    {"bodyBackgroundColor": "#A0875A", "componentBackgroundColor": "#911D50"},
    {"bodyBackgroundColor": "#911D50", "componentBackgroundColor": "#541831"},
    {"bodyBackgroundColor": "#DAD3C7", "componentBackgroundColor": "#761521"},
    {"bodyBackgroundColor": "#E1DAD8", "componentBackgroundColor": "#493C53"},
    {"bodyBackgroundColor": "#E4CE84", "componentBackgroundColor": "#547C97"},
    {"bodyBackgroundColor": "#C9C7C5", "componentBackgroundColor": "#0E31A0"},
    // {"bodyBackgroundColor": "#AB8483", "componentBackgroundColor": "#A55456"},
    {"bodyBackgroundColor": "#F7F7EB", "componentBackgroundColor": "#CB8098"},
    // {"bodyBackgroundColor": "#979AB9", "componentBackgroundColor": "#9E754E"},
    {"bodyBackgroundColor": "#D3CFCA", "componentBackgroundColor": "#B95D61"},
    {"bodyBackgroundColor": "#F1EADC", "componentBackgroundColor": "#67363D"},
    // {"bodyBackgroundColor": "#D8C0A0", "componentBackgroundColor": "#B49082"},
    {"bodyBackgroundColor": "#A08C9F", "componentBackgroundColor": "#33415D"},
    {"bodyBackgroundColor": "#DEB8B3", "componentBackgroundColor": "#51433F"},
    {"bodyBackgroundColor": "#CCC4B3", "componentBackgroundColor": "#A35842"},
];

export let darkThemeArray = [
    {"bodyBackgroundColor": "#9B8A9D", "componentBackgroundColor": "#F2EEE8"},
    {"bodyBackgroundColor": "#39364C", "componentBackgroundColor": "#DD94A1"},
    {"bodyBackgroundColor": "#493F36", "componentBackgroundColor": "#91955F"},
    {"bodyBackgroundColor": "#4F473A", "componentBackgroundColor": "#B3C5AB"},
    {"bodyBackgroundColor": "#A04F3C", "componentBackgroundColor": "#CF9A8C"},
    {"bodyBackgroundColor": "#665A4E", "componentBackgroundColor": "#AFC5C1"},
    {"bodyBackgroundColor": "#75706C", "componentBackgroundColor": "#B9B0A1"},
    {"bodyBackgroundColor": "#141F49", "componentBackgroundColor": "#745B9F"},
    {"bodyBackgroundColor": "#3A3E47", "componentBackgroundColor": "#B19BA7"},
    {"bodyBackgroundColor": "#504E4A", "componentBackgroundColor": "#BEB49B"},
    {"bodyBackgroundColor": "#504E4A", "componentBackgroundColor": "#70846A"},
    {"bodyBackgroundColor": "#504E4A", "componentBackgroundColor": "#A6845A"},
    {"bodyBackgroundColor": "#911D50", "componentBackgroundColor": "#A0875A"},
    {"bodyBackgroundColor": "#541831", "componentBackgroundColor": "#911D50"},
    {"bodyBackgroundColor": "#761521", "componentBackgroundColor": "#DAD3C7"},
    {"bodyBackgroundColor": "#493C53", "componentBackgroundColor": "#E1DAD8"},
    {"bodyBackgroundColor": "#547C97", "componentBackgroundColor": "#E4CE84"},
    {"bodyBackgroundColor": "#0E31A0", "componentBackgroundColor": "#C9C7C5"},
    // {"bodyBackgroundColor": "#A55456", "componentBackgroundColor": "#AB8483"},
    {"bodyBackgroundColor": "#CB8098", "componentBackgroundColor": "#F7F7EB"},
    // {"bodyBackgroundColor": "#9E754E", "componentBackgroundColor": "#979AB9"},
    {"bodyBackgroundColor": "#B95D61", "componentBackgroundColor": "#D3CFCA"},
    {"bodyBackgroundColor": "#67363D", "componentBackgroundColor": "#F1EADC"},
    {"bodyBackgroundColor": "#B49082", "componentBackgroundColor": "#D8C0A0"},
    {"bodyBackgroundColor": "#33415D", "componentBackgroundColor": "#A08C9F"},
    {"bodyBackgroundColor": "#51433F", "componentBackgroundColor": "#DEB8B3"},
    {"bodyBackgroundColor": "#A35842", "componentBackgroundColor": "#CCC4B3"},
];

export let defaultPreferenceData: PreferenceDataInterface = {
    dynamicEffect: "close",
    imageQuality: "full",
    imageTopics: ["bo8jQKTaE0Y"],
    customTopic: "",
    changeImageTime: "3600000",
    nightMode: true,
    noImageMode: false,

    searchEngine: "bing",
    buttonShape: "round",
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
export const colorRegExp = /^#[0-9A-Fa-f]{6}$/;
export const clientId = "ntHZZmwZUkhiLBMvwqqzmOG29nyXSCXlX7x_i-qhVHM";
export const unsplashUrl = "?utm_source=SkyNewTab&utm_medium=referral";  // Unsplash API规范
export const imageHistoryMaxSize = 5;
