import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import { forgotPassword } from "../actions";

export default function Page() {
    return (
        <>
            <H1>Forgot Password</H1>
            <form action={forgotPassword} className="flex flex-col gap-4">
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="@mail.com"
                >
                    Email
                </Input>

                <Button type="submit">Send Reset Email</Button>
            </form>
        </>
    );
}
