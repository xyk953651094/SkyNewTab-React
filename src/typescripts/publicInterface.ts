export interface PreferenceDataInterface {
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular" | "small" | "small_s3",
    imageTopics: string[],
    customTopic: string,
    changeImageTime: string,
    nightMode: boolean,
    autoDarkMode: boolean,
    noImageMode: boolean,

    searchEngine: "bing" | "google" | "baidu",
    buttonShape: "circle" | "default" | "round" | undefined,
    simpleMode: boolean,
    displayAlert: boolean,
}

export interface ThemeColorInterface {
    themeColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
}