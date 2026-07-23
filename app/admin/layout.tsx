import { PRIVATE_PAGE_METADATA } from "../../lib/siteMetadata";
import { AdminNav } from "./AdminNav";

export const metadata = PRIVATE_PAGE_METADATA;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
