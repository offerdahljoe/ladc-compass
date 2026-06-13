import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { navItems } from "@/lib/content";
import PrivacyBanner from "@/components/PrivacyBanner";
import CloudAccount from "@/components/CloudAccount";

export const metadata: Metadata = {
  title: "LADC Compass",
  description: "A local learning portal for LADC internship organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="mb-4 rounded-lg border border-ink/10 bg-white/86 px-4 py-4 shadow-soft backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Link href="/" className="focus-ring rounded-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-lagoon">
                  LADC Compass
                </p>
                <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
                  Counselor Learning Portal
                </h1>
              </Link>
              <nav className="flex gap-2 overflow-x-auto pb-1 lg:max-w-4xl lg:flex-wrap lg:justify-end">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-ring whitespace-nowrap rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-medium text-ink transition hover:border-lagoon hover:text-lagoon"
                  >
                    {item.short}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <PrivacyBanner />
          <div className="mt-4">
            <CloudAccount />
          </div>
          <main className="flex-1 py-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
