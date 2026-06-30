import Link from "next/link";
import { ArrowRight, CalendarClock, ShieldAlert, Sparkles, Target } from "lucide-react";

import { AppShell } from "@/src/components/mtos/app-shell";
import { ScorePill } from "@/src/components/mtos/score-pill";
import { SectionCard } from "@/src/components/mtos/section-card";
import { getClients, getCommandCenterSnapshot } from "@/src/lib/mtos-data";
import { healthTone } from "@/src/lib/utils";

export default function CommandCenterPage() {
  const snapshot = getCommandCenterSnapshot();
  const clients = getClients();

  return (
    <AppShell
      title="Command Center"
      subtitle="Start from the clearest operational picture: what changed, what matters, and what the Account Manager should do next."
    >
      <div className="grid gap-6 xl:grid-cols-[1.55fr_minmax(0,1fr)]">
        <SectionCard
          eyebrow="Today"
          title={snapshot.focusDate}
          subtitle="The Command Center is intentionally selective. It surfaces the highest-impact priorities instead of every possible data point."
          aside={
            <div className="flex flex-wrap gap-2">
              {snapshot.alerts.map((alert) => (
                <ScorePill
                  key={alert.label}
                  label="Signal"
                  value={alert.label}
                  tone={
                    alert.tone === "positive"
                      ? "positive"
                      : alert.tone === "warning"
                        ? "warning"
                        : "danger"
                  }
                />
              ))}
            </div>
          }
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {snapshot.priorities.map((priority, index) => (
              <article
                key={priority}
                className="rounded-[24px] border border-white/8 bg-white/4 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                    Priority {index + 1}
                  </span>
                  <Sparkles className="h-4 w-4 text-[#d7f5ec]" />
                </div>
                <p className="text-sm leading-7 text-slate-100">{priority}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Meeting readiness"
          title="Upcoming monthly touches"
          subtitle="The Account Manager should be able to judge readiness, relationship health, and next action from a single surface."
        >
          <div className="space-y-3">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/monthly-touch/${client.touchId}`}
                className="flex flex-col gap-4 rounded-[24px] border border-white/8 bg-white/4 p-5 transition hover:border-white/16 hover:bg-white/6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{client.name}</p>
                    <p className="text-sm text-slate-400">
                      {client.industry} · next touch {client.touchDate}
                    </p>
                  </div>
                  <ScorePill
                    label="Health"
                    value={client.healthScore}
                    tone={healthTone(client.healthScore)}
                  />
                </div>
                <p className="text-sm leading-6 text-slate-300">{client.summary}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    {client.commitmentsOpen} open commitments
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    {client.topRisks[0]}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    {client.topOpportunities[0]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <SectionCard
          eyebrow="Client portfolio"
          title="Relationship and growth overview"
          subtitle="The portfolio layer keeps the Account Manager focused on confidence, retention, and real expansion readiness."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="rounded-[24px] border border-white/8 bg-black/15 p-5 transition hover:bg-black/25"
              >
                <p className="text-base font-semibold text-white">{client.name}</p>
                <div className="mt-4 grid gap-2">
                  <ScorePill label="Health" value={client.healthScore} tone={healthTone(client.healthScore)} />
                  <ScorePill
                    label="Relationship"
                    value={client.relationshipScore}
                    tone={healthTone(client.relationshipScore)}
                  />
                  <ScorePill
                    label="Growth Readiness"
                    value={client.growthReadiness}
                    tone={healthTone(client.growthReadiness)}
                  />
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Guiding principle"
          title="The five-answer standard"
          subtitle="Every workflow in MTOS is designed to help the Account Manager answer these questions before the meeting ends."
        >
          <div className="grid gap-3">
            {[
              "What happened?",
              "Why did it happen?",
              "What are we doing about it?",
              "What should happen next?",
              "How does this help the client grow?",
            ].map((question) => (
              <div
                key={question}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-4"
              >
                <span className="text-sm text-slate-100">{question}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
