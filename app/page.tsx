"use client";
import Button from "@/components/ui/button";
import {
    Dropdown,
    DropdownButton,
    DropdownContent,
    DropdownLink,
    DropdownTrigger,
} from "@/components/ui/dropdown-menu";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";

export default function Page() {
    const [isPending, startTransition] = useTransition();

    function fakeClick() {
        console.log("clicked");
        startTransition(() => {
            // wait 1 second
            return new Promise((resolve) => setTimeout(resolve, 1000));
        });
        console.log("done");
    }

    return (
        <div className="prose p-8 dark:prose-invert">
            <div className="flex flex-col gap-4">
                <Link href="/login">Login</Link>
                <Link href="/forgot-password">Forgot Password</Link>
                <Link href="/reset-password">Reset Password</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/settings">Settings</Link>
            </div>

            <Button loading={isPending} onClick={fakeClick}>
                Click me
            </Button>
            <div className="aspect-square h-8 bg-white"></div>
            <div className="aspect-square h-8 bg-black"></div>
            <div className="aspect-square h-8 bg-green"></div>
            <div className="aspect-square h-8 bg-red"></div>
            <div className="aspect-square h-8 bg-blue"></div>
            <div className="aspect-square h-8 bg-yellow"></div>
            <Input type="file">Upload File</Input>
            <hr />
            <br />
            <br />
            <br />
            <br />
            <Dropdown>
                <DropdownTrigger>
                    <Button variant={"primary"} size={"sm"}>
                        menu test
                    </Button>
                </DropdownTrigger>
                <DropdownContent>
                    <DropdownLink href="/login">login</DropdownLink>
                    <DropdownButton>test item</DropdownButton>
                    <DropdownButton>test item</DropdownButton>
                    <DropdownButton>test item</DropdownButton>
                    <DropdownButton>test item</DropdownButton>
                </DropdownContent>
            </Dropdown>
            <div className="flex flex-wrap gap-2">
                <Button variant={"primary"}>Primary Button</Button>
                <Button variant={"primary"} disabled>
                    Primary Button
                </Button>
                <Button variant={"secondary"}>Secondary Button</Button>
                <Button variant={"danger"}>Danger Button</Button>
                <Button variant={"success"}>Success Button</Button>
                <Button variant={"info"}>Info Button</Button>
                <Button variant={"accent"}>Accent Button</Button>
                <Button variant={"muted"}>Muted Button</Button>
                <Button variant={"outline"}>Outline Button</Button>
                <Button variant={"ghost"}>Ghost Button</Button>
            </div>

            <div className="dark">
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant={"primary"}>menu test</Button>
                    </DropdownTrigger>
                    <DropdownContent>
                        <DropdownButton>test item</DropdownButton>
                        <DropdownButton>test item</DropdownButton>
                        <DropdownButton>test item</DropdownButton>
                        <DropdownButton>test item</DropdownButton>
                        <DropdownButton>test item</DropdownButton>
                    </DropdownContent>
                </Dropdown>
                <div className="flex flex-wrap gap-2 bg-background p-4">
                    <Button variant={"primary"}>Primary Button</Button>
                    <Button variant={"primary"} disabled>
                        Primary Button
                    </Button>
                    <Button variant={"secondary"}>Secondary Button</Button>
                    <Button variant={"danger"}>Danger Button</Button>
                    <Button variant={"success"}>Success Button</Button>
                    <Button variant={"info"}>Info Button</Button>
                    <Button variant={"accent"}>Accent Button</Button>
                    <Button variant={"muted"}>Muted Button</Button>
                    <Button variant={"outline"}>Outline Button</Button>
                    <Button variant={"ghost"}>Ghost Button</Button>
                </div>
            </div>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis voluptatum voluptatem officia cumque ullam beatae
                dolor necessitatibus id totam. Tenetur eveniet veritatis,
                possimus dolorem similique nisi debitis doloribus asperiores
                iure?
            </p>
        </div>
    );
}
