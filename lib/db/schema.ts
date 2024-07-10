import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: text("username"),
    email: text("email").unique().notNull(),
    passwordHash: text("passwordHash"),
    image: text("image"),
    emailVerified: boolean("emailVerified").notNull().default(false),
    role: roleEnum("role").notNull().default("user"),
});

export const registerTokenTable = pgTable("registerToken", {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
    userId: text("userId")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
});