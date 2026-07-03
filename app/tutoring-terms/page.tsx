import { buildPageMetadata } from "../../lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Weekly Tutoring Terms",
  description:
    "The terms for Nova Maths weekly tutoring blocks: weekly billing, the booked block commitment, and how to pause or cancel.",
  path: "/tutoring-terms",
});

export default function TutoringTermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm">
        <section className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Nova Maths
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Weekly Tutoring Terms
          </h1>
          <p className="text-slate-600">
            These terms apply when you enrol a student in a weekly tutoring block
            with Nova Maths by Joshua Taylor and set up automatic weekly payment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. The weekly block</h2>
          <p className="text-slate-700">
            Tutoring is booked as a block of consecutive weeks (for example 10
            weeks). When you accept these terms you are reserving a fixed weekly
            time slot for your child for the length of that block. The slot is
            held for your child each week and is not offered to other families.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Weekly payment</h2>
          <p className="text-slate-700">
            Payment is the agreed weekly amount, charged automatically each week
            on Monday to the card you provide at checkout. Nothing is charged
            when you sign up: your first weekly payment is taken on the agreed
            start Monday, and a full week&apos;s fee is then charged every Monday
            after that.
          </p>
          <p className="text-slate-700">
            Billing continues automatically each week until the subscription is
            paused or cancelled. There is no fixed end date in the payment
            system: the block length is the commitment you are agreeing to here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            3. Missed and skipped sessions
          </h2>
          <p className="text-slate-700">
            Because the weekly slot is reserved for your child, sessions you skip
            within the booked block are still payable. This includes weeks where
            your child is away, busy, or chooses not to attend (for example the
            last week of term). The weekly fee secures the slot, not only the
            individual session.
          </p>
          <p className="text-slate-700">
            Where reasonable notice is given, we will try to offer a make-up
            session at a mutually convenient time, but make-up sessions are not
            guaranteed and do not reduce the weekly fee.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. School holidays</h2>
          <p className="text-slate-700">
            Tutoring normally follows NSW school terms. Weekly billing can be
            paused over school holidays by agreement. If you would like billing
            paused for a holiday break, let us know before the break so we can
            pause the subscription. Billing resumes when term goes back unless
            you tell us otherwise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Pausing and cancelling</h2>
          <p className="text-slate-700">
            You can pause or cancel at any time by contacting us. Cancelling
            stops all future weekly charges. Weeks already charged within your
            booked block are not refunded, as the slot was reserved and held for
            your child.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Contact</h2>
          <p className="text-slate-700">
            For anything to do with your tutoring block, including pausing,
            cancelling, or a billing question, contact Joshua Taylor at{" "}
            <a
              className="font-semibold text-slate-900 underline"
              href="mailto:joshua.a.taylor7@gmail.com"
            >
              joshua.a.taylor7@gmail.com
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
