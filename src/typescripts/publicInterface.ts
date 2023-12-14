export interface PreferenceDataInterface {
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular" | "small" | "small_s3",
    imageTopics: string[],
    customTopic: string,
    changeImageTime: string,
    nightMode: boolean,
    noImageMode: boolean,

    searchEngine: "bing" | "google",
    buttonShape: "circle" | "default" | "round" | undefined,
    simpleMode: boolean,
}

export interface ThemeColorInterface {
    themeColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
}