import { AppShell } from "@/src/components/mtos/app-shell";
import { SectionCard } from "@/src/components/mtos/section-card";

export default function QaPage() {
  return (
    <AppShell
      title="Quality And Coaching"
      subtitle="QA in MTOS exists to improve future meetings through evidence-backed review, coaching, and calibration."
    >
      <SectionCard
        eyebrow="Planned next"
        title="QA and coaching slice"
        subtitle="The next phase adds the 17-point rubric, evidence viewer, review queue, scoring transparency, and coaching plans."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Evidence-first rubric review",
            "Human QA approval workflow",
            "Explainable score breakdowns",
            "Personalized coaching plans",
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
