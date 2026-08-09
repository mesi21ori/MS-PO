import AccountForm from "@/components/admin/account-form";
import { getAdminAccountEmail, getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const email = (await getAdminAccountEmail()) || session.email;

  return <AccountForm initialEmail={email} />;
}
