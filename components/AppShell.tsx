import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import TopSearch from "@/components/TopSearch";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopSearch />
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <MobileNav />
          <div className="mb-4 rounded-lg border border-lagoon/20 bg-white px-4 py-3 text-sm text-ink/70 shadow-soft">
            <strong className="text-ink">LADC Compass update:</strong> Build
            marker 2026-06-15-navigation-resource-groups-v1. Removed unused
            library tabs, simplified Kai-Shin Hub, rebuilt Group Therapy Hub,
            improved Resource Hub, and added internship hours to the dashboard.
          </div>
          <main className="mt-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
