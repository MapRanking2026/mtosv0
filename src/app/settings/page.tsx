import { AppShell } from "@/src/components/mtos/app-shell";
import { SectionCard } from "@/src/components/mtos/section-card";

export default function SettingsPage() {
  return (
    <AppShell
      title="Administration"
      subtitle="Administration should remain powerful but understandable, keeping permissions, AI controls, integrations, and governance in one calm workspace."
    >
      <SectionCard
        eyebrow="Platform services"
        title="Administration surface"
        subtitle="This seeded placeholder marks the future settings workspace for users, permissions, integrations, prompts, feature flags, and security controls."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Users and role assignments",
            "Integration health and reconnect flows",
            "Prompt and AI configuration",
            "Feature flags and release controls",
            "Audit logs and compliance settings",
            "Security and session governance",
          ].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/8 bg-white/4 p-5 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
