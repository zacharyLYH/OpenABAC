import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import TanStackProvider from '@/components/providers/tanstack-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'OpenABAC',
    description: 'Open Source Attribute Based Access Control (ABAC)',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, 'bg-black')}>
                <TanStackProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </TanStackProvider>
            </body>
        </html>
    );
}
