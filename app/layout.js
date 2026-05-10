import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import DynamicBackground from "@/components/DynamicBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "KVMTCC Tuition Centre — Shaping Future Toppers",
  description:
    "Premium tuition centre for CBSE & State Board students from Class 8 to 12. 10+ years of excellence. 98% success rate. Where future toppers are made.",
  keywords: [
    "KVMTCC",
    "Tuition Centre",
    "CBSE Coaching",
    "State Board Tuition",
    "Class 12 Coaching",
    "Board Exam Toppers",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F2" },
    { media: "(prefers-color-scheme: dark)", color: "#02040F" },
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('kvmtcc-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans overflow-x-hidden">
        <DynamicBackground />
        {children}
      </body>
    </html>
  );
}
