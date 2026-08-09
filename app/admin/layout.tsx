import { getAdminSession } from "@/lib/auth";
import AdminShell from "@/components/admin/admin-shell";
import { getUnreadMessageCount } from "@/lib/messages";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    return <>{children}</>;
  }

  let unreadMessages = 0;
  try {
    unreadMessages = await getUnreadMessageCount();
  } catch {
    unreadMessages = 0;
  }

  return (
    <AdminShell email={session.email} unreadMessages={unreadMessages}>
      {children}
    </AdminShell>
  );
}
