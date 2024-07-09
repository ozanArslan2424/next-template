"use server";
export const signIn = async (email: string, password: string) => {
    try {
        console.log("signin");
        // do sth
        return { success: "You have signed in." };
    } catch (e) {
        console.error("signin-error", e);
        return { error: "Something went wrong. Please try again." };
    }
};
export const signUp = async (email: string, password: string) => {
    try {
        console.log("signup");
        // do sth
        return { success: "You have signed in." };
    } catch (e) {
        console.error("signup-error", e);
        return { error: "Something went wrong. Please try again." };
    }
};

export const forgotPassword = async (formData: FormData) => {
    console.log("forgot password", formData);
};

export const resetPassword = async (formData: FormData) => {
    console.log("reset password", formData);
};
