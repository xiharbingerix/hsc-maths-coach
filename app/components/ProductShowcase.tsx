import type { ReactNode } from "react";

/**
 * "See exactly how Nova Maths works" — three large, alternating showcase
 * panels that prioritise the screenshot over text. Presentational only.
 *
 * Panel 1 uses the real lesson demo asset; panels 2 and 3 use premium
 * screenshot placeholders ready to swap in captured images later.
 */

type Panel = {
  eyebrow: string;
  headline: string;
  description: string;
  image?: { src: string; alt: string; width: number; height: number };
  placeholderLabel: string;
  icon: ReactNode;
};

const lessonIcon = (
  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const practiceIcon = (
  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
  </svg>
);

const diagnosticIcon = (
  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const panels: Panel[] = [
  {
    eyebrow: "Lesson experience",
    headline: "Learn with worked examples",
    description:
      "Every lesson breaks down concepts step-by-step before you practise them yourself.",
    image: {
      src: "/screenshots/lesson-worked-examples.png",
      alt: "A Nova Maths lesson showing a worked example broken down step by step",
      width: 1792,
      height: 1520,
    },
    placeholderLabel: "Lesson screenshot",
    icon: lessonIcon,
  },
  {
    eyebrow: "Guided practice",
    headline: "Practise with confidence",
    description: "Move from guided examples to independent problem solving.",
    image: {
      src: "/screenshots/lesson-guided-practice.png",
      alt: "A Nova Maths guided practice question with multiple-choice answers and a hint",
      width: 1792,
      height: 1440,
    },
    placeholderLabel: "Guided practice screenshot",
    icon: practiceIcon,
  },
  {
    eyebrow: "Diagnostic insights",
    headline: "Know what to revise next",
    description:
      "Your diagnostic identifies weak topics and recommends your next lessons.",
    image: {
      src: "/screenshots/diagnostic-results.png",
      alt: "A Nova Maths diagnostic study plan ranking the weakest topics to revise first",
      width: 1348,
      height: 1624,
    },
    placeholderLabel: "Diagnostic insights screenshot",
    icon: diagnosticIcon,
  },
];

function ScreenshotFrame({ panel }: Readonly<{ panel: Panel }>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
      {/* Browser-style chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      </div>
      {panel.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={panel.image.src}
          alt={panel.image.alt}
          className="block w-full"
          width={panel.image.width}
          height={panel.image.height}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
            {panel.icon}
          </span>
          <span className="text-sm font-medium">{panel.placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-12">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Product tour
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          See exactly how Nova Maths works
        </h2>
      </div>

      <div className="mt-10 space-y-12 md:mt-12 md:space-y-16">
        {panels.map((panel, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={panel.headline}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-14"
            >
              <div className={reversed ? "md:order-2" : ""}>
                <ScreenshotFrame panel={panel} />
              </div>
              <div className={reversed ? "md:order-1" : ""}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {panel.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {panel.headline}
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {panel.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
