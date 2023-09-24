export interface PreferenceDataInterface {
    searchEngine: "bing" | "google" | "baidu",
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular" | "small" | "small_s3",
    imageTopics: string[],
    customTopic: string,
    nightMode: boolean,
    simpleMode: boolean,
    noImageMode: boolean,
    displayAlert: boolean,
}

export interface ThemeColorInterface {
    themeColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
}