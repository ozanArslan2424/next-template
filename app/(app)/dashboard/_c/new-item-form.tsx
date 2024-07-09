"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useTransition } from "react";

export default function NewItemForm() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        startTransition(() => {
            // Submit form
        });
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                type="text"
                id="id"
                name="name"
                placeholder="Placeholder"
                required
            >
                Label
            </Input>
            <Input
                type="password"
                id="id"
                name="name"
                placeholder="Placeholder"
                required
            >
                Label
            </Input>

            <Button type="submit" loading={isPending}>
                Submit
            </Button>
        </form>
    );
}
