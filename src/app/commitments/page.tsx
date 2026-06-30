import { AppShell } from "@/src/components/mtos/app-shell";
import { SectionCard } from "@/src/components/mtos/section-card";
import { getClients, getCommitments } from "@/src/lib/mtos-data";

export default function CommitmentsPage() {
  const commitments = getCommitments();
  const clientMap = new Map(getClients().map((client) => [client.id, client.name]));

  return (
    <AppShell
      title="Commitment Workspace"
      subtitle="Every promise remains visible until resolved, with clear ownership, due dates, and source-meeting context."
    >
      <SectionCard
        eyebrow="Register"
        title="Active commitments"
        subtitle="This first slice establishes the structure for overdue work, ownership, and client-facing accountability."
      >
        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-black/20">
          <div className="grid grid-cols-[2.2fr_1.1fr_1fr_0.9fr_1.2fr] gap-4 border-b border-white/8 px-5 py-4 text-[11px] uppercase tracking-[0.24em] text-slate-400">
            <span>Commitment</span>
            <span>Client</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Due date</span>
          </div>
          {commitments.map((commitment) => (
            <div
              key={commitment.id}
              className="grid grid-cols-[2.2fr_1.1fr_1fr_0.9fr_1.2fr] gap-4 border-b border-white/6 px-5 py-4 text-sm text-slate-200 last:border-b-0"
            >
              <div>
                <p className="font-medium text-white">{commitment.title}</p>
                <p className="mt-1 text-xs text-slate-400">{commitment.sourceMeeting}</p>
              </div>
              <span>{clientMap.get(commitment.clientId)}</span>
              <span>{commitment.owner}</span>
              <span>{commitment.status}</span>
              <span>{commitment.dueDate}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
