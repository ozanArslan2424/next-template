import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center pt-24">
            <main className="min-w-96 p-4">{children}</main>
        </div>
    );
}
