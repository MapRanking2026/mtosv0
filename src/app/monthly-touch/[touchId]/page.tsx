import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ClipboardList, Mic, Sparkles, TimerReset } from "lucide-react";

import { AppShell } from "@/src/components/mtos/app-shell";
import { RecommendationCard } from "@/src/components/mtos/recommendation-card";
import { ScorePill } from "@/src/components/mtos/score-pill";
import { SectionCard } from "@/src/components/mtos/section-card";
import { getClientById, getMonthlyTouchById } from "@/src/lib/mtos-data";
import { healthTone } from "@/src/lib/utils";

export default async function MonthlyTouchPage({
  params,
}: {
  params: Promise<{ touchId: string }>;
}) {
  const { touchId } = await params;
  const touch = getMonthlyTouchById(touchId);

  if (!touch) {
    notFound();
  }

  const client = getClientById(touch.clientId);

  if (!client) {
    notFound();
  }

  const isOaklineTouch = touch.id === "touch-oakline-july";
  const oaklineRingSurfaceStyle = isOaklineTouch
    ? {
        backgroundColor: "var(--tw-ring-offset-color)",
      }
    : undefined;
  const oaklineSummaryButtonStyle = isOaklineTouch
    ? {
        backgroundColor: "var(--tw-ring-offset-color)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--tw-ring-color)",
      }
    : undefined;

  return (
    <AppShell
      title={`${client.name} Monthly Touch`}
      subtitle="Preparation, live support, and post-meeting execution live in a single operational environment so the Account Manager never has to reassemble context."
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_minmax(0,0.9fr)]">
        <SectionCard
          eyebrow="Preparation"
          title="Executive brief"
          subtitle="Readable in under five minutes, evidence-backed, and directly tied to the client's growth and relationship health."
          aside={
            <div className="flex flex-wrap gap-2">
              <ScorePill label="Readiness" value={touch.readinessScore} tone={healthTone(touch.readinessScore)} />
              <ScorePill
                label="Meeting confidence"
                value={touch.confidenceScore}
                tone={healthTone(touch.confidenceScore)}
              />
            </div>
          }
        >
          <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
            <p className="text-sm leading-7 text-slate-200">{touch.executiveBrief}</p>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Readiness"
          title={`${touch.status} status`}
          subtitle="Preparation quality and meeting confidence remain visible before the conversation begins."
        >
          <div className="space-y-3">
            {[
              "Agenda generated",
              "Historical commitments reviewed",
              "Top risks identified",
              "Growth opportunities identified",
              "Talking points prepared",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_minmax(0,1fr)]">
        <SectionCard
          eyebrow="Agenda"
          title="Meeting structure"
          subtitle="The platform drives clarity through a sequenced agenda instead of a crowded dashboard."
        >
          <div className="space-y-3">
            {touch.agenda.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[24px] border border-white/8 bg-white/4 p-4">
                <div
                  style={oaklineRingSurfaceStyle}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950"
                >
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Keep the conversation tied to evidence, action, and business value.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Live meeting"
          title="Low-noise guidance layer"
          subtitle="The live workspace should assist without dominating the interface."
        >
          <div className="grid gap-3">
            {[
              { icon: TimerReset, label: "Agenda progress and timing" },
              { icon: Mic, label: "Structured notes and commitment capture" },
              { icon: Sparkles, label: "Subtle talking-point and question support" },
              { icon: ClipboardList, label: "Completion checks before ending the meeting" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
                <Icon className="h-4 w-4 text-[#d7f5ec]" />
                <span className="text-sm text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1.1fr]">
        <SectionCard eyebrow="Wins" title="What to celebrate" subtitle="Wins without measurable value should not be surfaced.">
          <div className="space-y-3">
            {touch.wins.map((win) => (
              <div key={win} className="rounded-2xl border border-emerald-400/10 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {win}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Risks" title="What requires attention" subtitle="Risks stay visible and actionable.">
          <div className="space-y-3">
            {touch.risks.map((risk) => (
              <div key={risk} className="rounded-2xl border border-rose-400/10 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {risk}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Action planning" title="Talking points and commitments" subtitle="Recommendations must create confident delivery and accountable follow-through.">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Talking points</p>
              {touch.talkingPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200">
                  {point}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Commitments to confirm</p>
              {touch.commitments.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        eyebrow="AI assistance"
        title="Evidence-backed recommendations"
        subtitle="AI supports preparation by showing what to say, why it matters, and what evidence supports the recommendation."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {touch.aiRecommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Post-meeting"
        title="Complete the follow-through workflow"
        subtitle="Preparation should flow directly into summary, ownership, and execution once the meeting ends."
      >
        <Link
          href={`/monthly-touch/${touch.id}/summary`}
          style={oaklineSummaryButtonStyle}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#d7f5ec]"
        >
          Open post-meeting summary
        </Link>
      </SectionCard>
    </AppShell>
  );
}
