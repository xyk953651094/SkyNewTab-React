export interface PreferenceInterface {
    "searchEngineRadio": "bing" | "google" | "baidu",
    "dynamicEffectRadio": "all" | "rotate" | "translate" | "close",
    "imageQualityRadio": "full" | "regular" | "small",
    "imageTopicsCheckbox": string
}

export interface ThemeColorInterface {
    "componentBackgroundColor": string,
    "componentFontColor": string,
}