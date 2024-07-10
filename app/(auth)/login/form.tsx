"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { login } from "@/lib/auth/actions";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function LoginForm() {
    const [error, setError] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) return setError(true);

        const values = { email, password };

        startTransition(() => {
            login(values).then((res) => {
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

    return (
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
                name="email"
                id="email"
                type="email"
                placeholder="@mail.com"
                disabled={isPending}
                error={error}
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
            >
                Password
            </Input>

            <Link
                href="/forgot-password"
                className="text-sm font-medium hover:underline"
            >
                Forgot password?
            </Link>

            <Button type="submit" variant="primary" loading={isPending}>
                Login
            </Button>
        </form>
    );
}
