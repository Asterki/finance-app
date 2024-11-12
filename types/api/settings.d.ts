interface GeneralRequestData {
    theme: "dark" | "light";
    language: "en" | "es";
}
export interface GeneralResponseData {
    status:
        | "success"
        | "unauthenticated"
        | "invalid-parameters"
        | "internal-error";
}

interface NotificationsRequestData {
    showNotifications: boolean;
    playSound: boolean;
}
interface NotificationsResponseData {
    status:
        | "success"
        | "unauthenticated"
        | "invalid-parameters"
        | "internal-error";
}

interface PrivacyRequestData {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    showReadReceipts: boolean;
}
interface PrivacyResponseData {
    status:
        | "success"
        | "unauthenticated"
        | "invalid-parameters"
        | "internal-error";
}

interface SecurityRequestData {
    twoFactor: {
        active: boolean;
        secret: string;
    };
    password: string;
}
interface SecurityResponseData {
    status:
        | "success"
        | "unauthenticated"
        | "invalid-parameters"
        | "internal-error"
        | "not-found"
        | "invalid-password"
}

interface SecurityChangePasswordRequestData {
    newPassword: string;
    oldPassword: string;
}

interface TFARequestData {
    password: string;
    action: "activate" | "deactivate";
    secret?: string
}


export type {
    GeneralRequestData,
    GeneralResponseData,
    NotificationsRequestData,
    NotificationsResponseData,
    PrivacyRequestData,
    PrivacyResponseData,
    SecurityRequestData,
    SecurityResponseData,
    SecurityChangePasswordRequestData,
    TFARequestData
};
