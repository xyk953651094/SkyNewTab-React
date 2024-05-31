export interface PreferenceDataInterface {
    dynamicEffect: "all" | "rotate" | "translate" | "close",
    imageQuality: "full" | "regular",
    imageTopics: string[],
    customTopic: string,
    changeImageTime: string,
    nightMode: boolean,
    noImageMode: boolean,

    searchEngine: "bing" | "google",
    buttonShape: "circle" | "default" | "round" | undefined,
    simpleMode: boolean,
    accessKey: string
}

export interface ThemeColorInterface {
    themeColor: string,
    componentBackgroundColor: string,
    componentFontColor: string,
}