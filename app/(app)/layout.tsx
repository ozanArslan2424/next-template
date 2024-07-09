import { SideMenu } from "@/components/ui/sidemenu";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full min-h-screen">
            <SideMenu>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>

                <div>
                    <button>Logout</button>
                </div>
            </SideMenu>
            <main>{children}</main>
        </div>
    );
}
