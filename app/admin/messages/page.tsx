import MessagesInbox from "@/components/admin/messages-inbox";
import { getContactMessages } from "@/lib/messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Contact Messages</h2>
        <p className="mt-2 text-zinc-400">
          Messages from the contact form are emailed to you and listed here.
        </p>
      </div>
      <MessagesInbox
        messages={messages.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
