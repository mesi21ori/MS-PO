import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getSiteContent } from "@/lib/site-content";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Always store in admin inbox
    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://meseretshumet.vercel.app";

    // Email is best-effort; message is already saved for the dashboard
    if (toEmail && fromEmail && process.env.RESEND_API_KEY) {
      try {
        const site = await getSiteContent();
        const brandPrimary = site.platform.brandColors.primary || "#ff6b3d";
        const brandBackground =
          site.platform.brandColors.background || "#05040f";
        const logoUrl = site.platform.logo.startsWith("http")
          ? site.platform.logo
          : `${siteUrl}${site.platform.logo}`;

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: email,
          subject: `New portfolio message from ${name}`,
          html: `
            <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
              <div style="max-width:680px;margin:0 auto;padding:32px 16px;">
                <div style="background:${brandBackground};border-radius:24px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,0.18);">
                  <div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.1);text-align:center;">
                    <img src="${logoUrl}" alt="Logo" style="width:72px;height:72px;border-radius:50%;object-fit:cover;margin-bottom:16px;background:#ffffff;" />
                    <h1 style="margin:0;color:#ffffff;font-size:26px;">New Portfolio Message</h1>
                    <p style="margin:10px 0 0;color:#b8b8c4;font-size:14px;">Also saved in your admin dashboard inbox.</p>
                  </div>
                  <div style="padding:32px;">
                    <div style="background:#11111d;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;margin-bottom:20px;">
                      <p style="margin:0 0 8px;color:${brandPrimary};font-size:13px;font-weight:bold;text-transform:uppercase;">Sender</p>
                      <p style="margin:12px 0;color:#ffffff;font-size:15px;"><strong>Name:</strong> ${safeName}</p>
                      <p style="margin:12px 0;color:#ffffff;font-size:15px;">
                        <strong>Email:</strong>
                        <a href="mailto:${safeEmail}" style="color:${brandPrimary};text-decoration:none;">${safeEmail}</a>
                      </p>
                    </div>
                    <div style="background:#11111d;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                      <p style="margin:0 0 12px;color:${brandPrimary};font-size:13px;font-weight:bold;text-transform:uppercase;">Message</p>
                      <p style="margin:0;color:#e5e7eb;font-size:15px;line-height:1.8;">${safeMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email send failed (message still saved):", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { success: false, message: "Message failed to send. Please try again." },
      { status: 500 }
    );
  }
}
