import { AdminLayout } from "@/modules/admin-panel/components/AdminLayout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <AdminLayout lang={lang}>{children}</AdminLayout>;
}
