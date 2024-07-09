import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        borderRadius: {
            none: "0",
            xl: "calc(var(--radius) + 2px)",
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: "calc(var(--radius) - 4px)",
            full: "9999px",
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        colors: {
            white: "hsl(var(--white))",
            black: "hsl(var(--black))",
            green: "hsl(var(--green))",
            red: "hsl(var(--red))",
            blue: "hsl(var(--blue))",
            yellow: "hsl(var(--yellow))",
            transparent: "transparent",
            current: "currentColor",
            border: "hsl(var(--border))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            danger: {
                DEFAULT: "hsl(var(--danger))",
                foreground: "hsl(var(--danger-foreground))",
            },
            success: {
                DEFAULT: "hsl(var(--success))",
                foreground: "hsl(var(--success-foreground))",
            },
            info: {
                DEFAULT: "hsl(var(--info))",
                foreground: "hsl(var(--info-foreground))",
            },
        },
        extend: {
            keyframes: {
                scaleIn: {
                    "0%": {
                        transform: "scale(0.75)",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                },
                slideRight: {
                    "0%": {
                        transform: "translateX(-100%)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                slideLeft: {
                    "0%": {
                        transform: "translateX(100%)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                slideUp: {
                    "0%": {
                        transform: "translateY(100%)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
                slideDown: {
                    "0%": {
                        transform: "translateY(-100%)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "scale-in": "scaleIn 0.25s ease-in-out",
                "slide-right": "slideRight 0.25s ease-in-out",
                "slide-left": "slideLeft 0.25s ease-in-out",
                "slide-up": "slideUp 0.25s ease-in-out",
                "slide-down": "slideDown 0.25s ease-in-out",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
    ],
};
export default config;
