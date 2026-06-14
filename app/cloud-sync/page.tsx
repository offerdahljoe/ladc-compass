import CloudAccount from "@/components/CloudAccount";
import PageHeader from "@/components/PageHeader";

export default function CloudSyncPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cloud Sync"
        title="Sign in and sync LADC Compass"
        description="Use email sign-in to sync internship hours, treatment plan practice, supervision notes, group plans, and upload records across computers."
      />
      <CloudAccount />
      <section className="mt-5 rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-semibold text-ink">What should happen</h3>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          If Supabase is connected in Vercel, you will see an email box and an
          "Email sign-in link" button. If you see "Cloud sync not connected
          yet," the Vercel environment variables still need to be added or the
          site needs to be redeployed after adding them.
        </p>
      </section>
      <section className="mt-5 rounded-lg border border-clay/30 bg-clay/10 p-5">
        <h3 className="text-xl font-semibold text-ink">Safety reminder</h3>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          Cloud sync is for learning notes and templates only. Do not enter real
          client names, dates of birth, addresses, case numbers, chart
          screenshots, or protected health information.
        </p>
      </section>
    </>
  );
}
