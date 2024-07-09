"use client";
import { GoogleIcon } from "@/components/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { signIn, signUp } from "../actions";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleSignIn = () => {
        startTransition(() => {
            signIn(email, password).then((res) => {
                if (res.error) {
                    toast.error(res.error);
                    setError(true);
                }
                if (res.success) {
                    toast.success(res.success);
                }
            });
        });
    };

    const handleSignUp = () => {
        startTransition(() => {
            signUp(email, password).then((res) => {
                if (res.error) {
                    toast.error(res.error);
                    setError(true);
                }
                if (res.success) {
                    toast.success(res.success);
                }
            });
        });
    };

    const handleGoogleSignIn = () => {
        // do sth
    };

    return (
        <form className="flex flex-col gap-4">
            <Input
                name="email"
                id="email"
                type="email"
                placeholder="@mail.com"
                disabled={isPending}
                error={error}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
                Email
            </Input>

            <Input
                name="password"
                id="password"
                type="password"
                placeholder="********"
                disabled={isPending}
                error={error}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            >
                Password
            </Input>

            <Link
                href="/forgot-password"
                className="text-sm font-medium hover:underline"
            >
                Forgot password?
            </Link>

            <Button
                type="submit"
                variant="primary"
                loading={isPending}
                onClick={handleSignIn}
            >
                Sign In
            </Button>

            <Button
                type="button"
                variant="secondary"
                loading={isPending}
                onClick={handleSignUp}
            >
                Register
            </Button>

            <Button
                type="button"
                variant="secondary"
                loading={isPending}
                onClick={handleGoogleSignIn}
            >
                <GoogleIcon />
                Sign in with Google
            </Button>
        </form>
    );
}
