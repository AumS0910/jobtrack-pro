import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#000000",
            },
            borderRadius: {
                xl: "16px",
                "2xl": "24px",
            },
        },
    },
    plugins: [],
} satisfies Config;
