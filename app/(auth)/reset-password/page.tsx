"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    if (!token) {
        return (
            <div className="flex flex-col items-center gap-4">
                <H1>
                    Invalid token. Please check your email for the correct link.
                </H1>
                <Link href="/login">
                    <Button>Go back to sign in page</Button>
                </Link>
            </div>
        );
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        console.log("reset password", token);
    };

    return (
        <>
            <H1>Reset Password</H1>
            <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-4"
            >
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="********"
                >
                    Password
                </Input>
                <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                >
                    Confirm Password
                </Input>

                <Button type="submit">Reset Password</Button>
            </form>
        </>
    );
}
