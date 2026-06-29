import { buildPageMetadata } from "../../lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Free NSW Maths Diagnostic",
  description:
    "Take a free NSW maths diagnostic, identify weak topics and get a clearer study path from Year 7 to HSC.",
  path: "/diagnostic/select",
});

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
