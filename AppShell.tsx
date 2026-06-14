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
            <div className="mb-4 rounded-lg border border-lagoon/20 bg-white px-4 py-3 text-sm text-ink/70 shadow-soft">
              <strong className="text-ink">LADC Compass update:</strong> Medications,
              Google search, and detailed 12 Core Functions content are included
              in this build.
            </div>
            <PrivacyBanner />
            <main className="mt-5">{children}</main>
          </div>
        </div>
      </div>
    </LoginGate>
  );
}
