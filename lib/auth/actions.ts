"use server";
import { getSession, lucia } from "@/lib/auth";
import db from "@/lib/db";
import { registerTokenTable, userTable } from "@/lib/db/schema";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { checkCharLength } from "../utils";
import { sendEmail } from "../utils/nodemailer";

export const getUserById = async (userId: string) => {
    const user = await db.query.userTable.findFirst({
        where: (table) => eq(table.id, userId),
    });

    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await db.query.userTable.findFirst({
        where: (table) => eq(table.email, email),
    });

    return user;
};

export const verifyInvite = async (token: string) => {
    try {
        // find registerToken in db -> existingToken
        const existingToken = await db.query.registerTokenTable.findFirst({
            where: eq(registerTokenTable.token, token),
        });

        // if no existingToken return error
        if (!existingToken) return { error: "This link/token is invalid." };

        // if existingToken expired return error
        const hasExpired = new Date(existingToken.expiresAt) < new Date();

        if (hasExpired) return { expired: "This link/token has expired." };

        // find existingUser in db with email
        const existingUser = await getUserByEmail(existingToken.email);

        // if no existingUser return error
        if (!existingUser) {
            return { error: "Email invalid." };
        }

        // if user already verified return error
        if (existingUser.emailVerified) {
            return { success: "Email already validated." };
        }

        // update existingUser -> emailVerified true, email: existingToken.email
        await db
            .update(userTable)
            .set({
                email: existingToken.email,
                emailVerified: true,
            })
            .where(eq(userTable.id, existingUser.id));

        // delete existingToken
        await db
            .delete(registerTokenTable)
            .where(eq(registerTokenTable.id, existingToken.id));

        return { success: "Email validated.", email: existingToken.email };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

export const inviteUser = async (email: string) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) return { error: "User already exists." };

        // create user
        const generatedUserId = uuid();
        await db.insert(userTable).values({
            email,
            id: generatedUserId,
            emailVerified: false,
            role: "user",
        });

        // create registerToken
        const token = uuid();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 hours from now
        await db.insert(registerTokenTable).values({
            id: token,
            email,
            token,
            expiresAt,
            userId: generatedUserId,
        });

        // ! send email
        sendEmail({ type: "invite", email, token });

        return { success: "Invited." };
    } catch {
        return { error: "There was an error. Please try again" };
    }
};

export const registerAction = async (formData: {
    username: string;
    email: string;
    password: string;
}) => {
    try {
        // validate fields
        if (!formData.username || !formData.email || !formData.password)
            return { error: "Please fill in all fields." };
        if (!checkCharLength(formData.username, 3, 20))
            return { error: "Username must be between 3 and 20 characters." };
        if (!checkCharLength(formData.password, 8, 100))
            return { error: "Password must be at least 8 characters." };

        // check if email is invited
        const existingUser = await getUserByEmail(formData.email);
        if (!existingUser)
            return { error: "No invite found for provided email." };

        // hash password
        const hashedPassword = await hash(formData.password);

        // update user in db -> username, passwordHash, emailVerified
        await db
            .update(userTable)
            .set({
                username: formData.username,
                passwordHash: hashedPassword,
            })
            .where(eq(userTable.email, formData.email));

        // create lucia session
        const session = await lucia.createSession(existingUser.id, {
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
        });
        // create and set sessionCookie
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return { success: "Registered." };
    } catch {
        return { error: "There was an error. Please try again" };
    }
};

export const login = async (formData: { email: string; password: string }) => {
    try {
        // validate fields
        if (!formData.email || !formData.password)
            return { error: "Please fill in all fields." };
        if (!checkCharLength(formData.password, 8, 100))
            return { error: "Password must be at least 8 characters." };

        // find user in db -> existingUser
        const existingUser = await getUserByEmail(formData.email);
        if (
            !existingUser ||
            !existingUser.passwordHash ||
            !existingUser.emailVerified
        )
            return { error: "User not found." };

        // verify password
        const isValidPassword = await verify(
            existingUser.passwordHash,
            formData.password,
        );

        if (!isValidPassword) return { error: "Mistake in email or password" };

        // create lucia session
        const session = await lucia.createSession(existingUser.id, {
            expiresIn: 60 * 60 * 24 * 30, // 30 days
        });

        // create and set sessionCookie
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return { success: "Logged in." };
    } catch {
        return { error: "There was an error. Please try again" };
    }
};

export const logout = async () => {
    try {
        const { session } = await getSession();
        if (!session) return { error: "Not logged in." };

        // invalidate lucia session
        await lucia.invalidateSession(session.id);

        // create and set blank sessionCookie
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return { success: "Logged out." };
    } catch (error) {
        return { error: "There was an error. Please try again" };
    }
};

// TODO: add update settings action
export const updateSettings = async (formData: {
    username: string;
    email: string;
    password: string;
}) => {
    //     try {
    //         const validatedFields = SettingsSchema.safeParse(values);
    //         if (!validatedFields.success) {
    //             return { error: "There was an error. Please try again" };
    //         }
    //         const currentUser = await getSession();
    //         if (!currentUser || !currentUser.user) {
    //             return { error: "Not logged in." };
    //         }
    //         const existingUser = await getUserByEmail(currentUser.user.email);
    //         if (!existingUser) {
    //             return { error: "User not found." };
    //         }
    //         const passwordConfirmed = await verify(
    //             existingUser.passwordHash,
    //             validatedFields.data.password,
    //         );
    //         if (!passwordConfirmed) {
    //             return { error: "Mistake in email or password" };
    //         }
    //         if (validatedFields.data.newPassword && passwordConfirmed) {
    //             const hashedPassword = await hash(validatedFields.data.newPassword);
    //             await db
    //                 .update(userTable)
    //                 .set({
    //                     username: validatedFields.data.username,
    //                     email: validatedFields.data.email,
    //                     passwordHash: hashedPassword,
    //                 })
    //                 .where(eq(userTable.id, validatedFields.data.userId));
    //         }
    //         await db
    //             .update(userTable)
    //             .set({
    //                 username: validatedFields.data.username,
    //                 email: validatedFields.data.email,
    //             })
    //             .where(eq(userTable.id, validatedFields.data.userId));
    //         return { success: "Settings updated." };
    //     } catch {
    //         return { error: "There was an error. Please try again" };
    //     }
};

// TODO: add forgotPassword action
export const forgotPassword = async (formData: FormData) => {
    console.log("forgot password", formData);
};

// TODO: add resetPassword action
export const resetPassword = async (formData: FormData) => {
    console.log("reset password", formData);
};
