import { AppShell } from "@/src/components/mtos/app-shell";
import { SectionCard } from "@/src/components/mtos/section-card";
import { getClients, getOpportunities } from "@/src/lib/mtos-data";

export default function OpportunitiesPage() {
  const clientMap = new Map(getClients().map((client) => [client.id, client.name]));
  const opportunities = getOpportunities();
  const stages = ["Signal", "Qualified", "Proposal", "Active"] as const;

  return (
    <AppShell
      title="Opportunity Workspace"
      subtitle="Growth recommendations should feel strategic and client-fit, not like disconnected upsell prompts."
    >
      <SectionCard
        eyebrow="Pipeline"
        title="Relationship-aware growth view"
        subtitle="Every opportunity includes timing, value, readiness, and the next step that should happen."
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage} className="rounded-[24px] border border-white/8 bg-black/20 p-4">
              <p className="text-sm font-semibold text-white">{stage}</p>
              <div className="mt-4 space-y-3">
                {opportunities
                  .filter((item) => item.stage === stage)
                  .map((item) => (
                    <div key={item.id} className="rounded-[20px] border border-white/8 bg-white/4 p-4">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{clientMap.get(item.clientId)}</p>
                      <p className="mt-3 text-sm text-slate-300">{item.nextStep}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                        <span>{item.value}</span>
                        <span>Readiness {item.readiness}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
