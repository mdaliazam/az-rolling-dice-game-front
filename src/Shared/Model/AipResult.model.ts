export interface ApiResult {
    success: boolean,
    message?: string;
    entity?: any;
    entities?: Array<any>;
}

export const defaultResult: Readonly<ApiResult> = {
    success: false,
    message: "Could not invoke the API"
};