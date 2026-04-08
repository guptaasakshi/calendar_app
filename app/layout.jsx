import "./globals.css";

export const metadata = {
    title: "Wall Calendar",
    description: "Interactive Wall Calendar – Date Range & Notes",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}