import QueryProvider from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickFeed",
  description: "Analytics made easy!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <my-widget project="41"></my-widget>
            <script src="https://quickfeedwidgetlight.netlify.app/widget.js"></script>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}