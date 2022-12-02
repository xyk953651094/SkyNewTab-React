import {getFontColor} from "./publicFunctions";

export interface ImageDataInterface {
    "id": string | null,
    "created_at": string | null,
    "updated_at": string | null,
    "promoted_at": string | null,
    "width": number | null,
    "height": number | null,
    "color": string | null,
    "blur_hash": string | null,
    "description": string | null,
    "alt_description": string | null,
    "urls": {
        "raw": string | null,
        "full": string | null,
        "regular": string | null,
        "small": string | null,
        "thumb": string | null,
        "small_s3": string | null
    },
    "links": {
        "self": string | null,
        "html": string | null,
        "download": string | null,
        "download_location": string | null
    },
    "categories": [],
    "likes": number | null,
    "liked_by_user": boolean | null,
    "current_user_collections": [],
    "sponsorship": null | null,
    "topic_submissions": object | null,
    "user": {
        "id": string | null,
        "updated_at": string | null,
        "username": string | null,
        "name": string | null,
        "first_name": string | null,
        "last_name": string | null,
        "twitter_username": string | null,
        "portfolio_url": string | null,
        "bio": string | null,
        "location": string | null,
        "links": {
            "self": string | null,
            "html": string | null,
            "photos": string | null,
            "likes": string | null,
            "portfolio": string | null,
            "following": string | null,
            "followers": string | null
        },
        "profile_image": {
            "small": string | null,
            "medium": string | null,
            "large": string | null
        },
        "instagram_username": string | null,
        "total_collections": number | null,
        "total_likes": number | null,
        "total_photos": number | null,
        "accepted_tos": boolean | null,
        "for_hire": boolean | null,
        "social": {
            "instagram_username": string | null,
            "portfolio_url": string | null,
            "twitter_username": string | null,
            "paypal_email": string | null
        }
    },
    "exif": object | null,
    "location": {
        "title": string | null,
        "name": string | null,
        "city": string | null,
        "country": string | null,
        "position": {"latitude": number | null, "longitude": number | null}
    },
    "views": number | null,
    "downloads": number | null
}

export interface FormInitialValuesInterface {
    "displayEffectRadio": "regular" | "full" | "raw",
    "dynamicEffectRadio": "close" | "translate" | "rotate" | "all",
    "imageTopicsCheckbox": string
}

export interface ThemeColorInterface {
    "componentBackgroundColor": string,
    "componentFontColor": string,
}

export interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
}