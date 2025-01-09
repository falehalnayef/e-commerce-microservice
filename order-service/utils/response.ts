export const successResponse = (status: boolean, message: string, data: any) => {
    return { status, message, data };
};

export const failureResponse = (status: boolean, message: string) => {
    return { status, message };
};