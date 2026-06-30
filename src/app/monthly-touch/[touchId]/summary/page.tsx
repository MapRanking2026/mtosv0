import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MessageSquareText, NotebookPen } from "lucide-react";

import { AppShell } from "@/src/components/mtos/app-shell";
import { SectionCard } from "@/src/components/mtos/section-card";
import { getClientById, getMonthlyTouchById } from "@/src/lib/mtos-data";

export default async function MonthlyTouchSummaryPage({
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

  return (
    <AppShell
      title={`${client.name} Follow-Through`}
      subtitle="The post-meeting workspace converts discussion into summary, follow-up communication, and accountable execution."
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_minmax(0,0.9fr)]">
        <SectionCard
          eyebrow="Summary"
          title="Meeting recap draft"
          subtitle="A strong summary should be accurate, concise, and easy for the client to understand."
        >
          <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
            <p className="text-sm leading-7 text-slate-200">
              {client.name} reviewed performance gains, current risks, and the next strategic growth
              opportunities. The follow-up should reinforce measurable wins, acknowledge open issues
              transparently, and confirm the exact owners and deadlines for the next actions.
            </p>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Delivery"
          title="Client-facing follow-up"
          subtitle="The Account Manager should be able to move from meeting to polished follow-up with minimal friction."
        >
          <div className="space-y-3">
            {[
              "Performance recap anchored to visible results",
              "Acknowledgement of open risks and recovery actions",
              "Clear list of confirmed commitments and due dates",
              "Next meeting framing and timeline",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard eyebrow="Commitments" title="Confirmed next actions" subtitle="Every action needs an owner and clear follow-through.">
          <div className="space-y-3">
            {touch.commitments.map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Output" title="Draft assets" subtitle="Post-meeting work should produce usable deliverables, not more busywork.">
          <div className="space-y-3">
            {[
              { icon: MessageSquareText, label: "Internal recap draft" },
              { icon: Mail, label: "Client follow-up email draft" },
              { icon: NotebookPen, label: "Commitment handoff summary" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
                <Icon className="h-4 w-4 text-[#d7f5ec]" />
                <span className="text-sm text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Next step" title="Continue the workflow" subtitle="The UI should guide the Account Manager into the next concrete action.">
          <div className="space-y-3">
            <Link
              href="/commitments"
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-slate-200 transition hover:bg-white/6"
            >
              Open commitment workspace
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/opportunities"
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-slate-200 transition hover:bg-white/6"
            >
              Review linked opportunities
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href={`/monthly-touch/${touch.id}`}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-4 text-sm text-slate-200 transition hover:bg-white/6"
            >
              Return to meeting workspace
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
