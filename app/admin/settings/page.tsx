import AccountSettingsForm from "@/components/admin/account-settings-form";
import { getAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const admin = await getAdminUser();

  return <AccountSettingsForm initialEmail={admin.email} />;
}
