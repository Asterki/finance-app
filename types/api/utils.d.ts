import type { GeneratedSecret } from "speakeasy";

interface GenerateTFAResponseData {
    status: "success";
    data: GeneratedSecret;
}

interface VerifyTFARequestBody {
    code: string;
    secret: string;
}
interface VerifyTFAResponseData {
    status: "success" | "invalid-parameters";
    valid?: boolean;
}

export type {
    GenerateTFAResponseData,
    VerifyTFAResponseData,
    VerifyTFARequestBody
};