import LoginGate from "@/components/LoginGate";
import MobileNav from "@/components/MobileNav";
import PrivacyBanner from "@/components/PrivacyBanner";
import Sidebar from "@/components/Sidebar";
import TopSearch from "@/components/TopSearch";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LoginGate>
      <div className="flex min-h-screen bg-paper text-ink">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopSearch />
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <MobileNav />
            <PrivacyBanner />
            <main className="mt-5">{children}</main>
          </div>
        </div>
      </div>
    </LoginGate>
  );
}
