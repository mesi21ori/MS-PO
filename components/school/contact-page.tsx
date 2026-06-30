// import {
//   FaLinkedinIn,
//   FaInstagram,
//   FaFacebookF,
//   FaXTwitter,
//   FaYoutube,
//   FaGithub,
// } from "react-icons/fa6";
// import { IconType } from "react-icons";
// import { portfolioContent } from "@/lib/portfolioContent";

// const socialIconMap: Record<string, IconType> = {
//   linkedin: FaLinkedinIn,
//   instagram: FaInstagram,
//   facebook: FaFacebookF,
//   twitter: FaXTwitter,
//   x: FaXTwitter,
//   youtube: FaYoutube,
//   github: FaGithub,
// };

// export default function ContactPage() {
//   const { contact, platform } = portfolioContent;
//   const colors = platform.brandColors;

//   return (
//     <section
//       id="contact"
//       className="min-h-screen text-white px-6 md:px-16 lg:px-24 py-24"
//       style={{
//         backgroundColor: colors.background || "#070707",
//       }}
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* Left Contact Info */}
//         <div className="relative">
//           {/* Desktop Social Icons */}
//           <div className="hidden md:flex flex-col gap-5 absolute left-0 top-1/2 -translate-y-1/2">
//             {contact.socialMedia.map((social) => {
//               const Icon = socialIconMap[social.icon.toLowerCase()];

//               if (!Icon) return null;

//               return (
//                 <a
//                   key={social.name}
//                   href={social.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.name}
//                   className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition"
//                   style={{
//                     color: colors.secondary,
//                   }}
//                 >
//                   <Icon size={16} />
//                 </a>
//               );
//             })}
//           </div>

//           <div className="md:pl-24 text-center">
//             <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-8">
//               CONTACT
//             </h2>

//             <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-xl mx-auto mb-12">
//               {contact.description}
//             </p>

//             <div className="space-y-6">
//               {/* Education */}
//               <div>
//                 <h3 className="font-bold text-lg mb-2">Education</h3>

//                 <div className="space-y-3">
//                   {contact.education.map((item, index) => (
//                     <div key={index}>
//                       <p className="text-white/90 text-sm font-semibold">
//                         {item.schoolName}
//                       </p>

//                       {(item.degree || item.fieldOfStudy) && (
//                         <p className="text-white/75 text-sm">
//                           {item.degree}
//                           {item.degree && item.fieldOfStudy ? " - " : ""}
//                           {item.fieldOfStudy}
//                         </p>
//                       )}

//                       {(item.startDate || item.endDate) && (
//                         <p className="text-white/60 text-xs mt-0.5">
//                           {item.startDate} - {item.endDate}
//                         </p>
//                       )}

//                       {item.description && (
//                         <p className="text-white/70 text-sm mt-1">
//                           {item.description}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Phone */}
//               <div>
//                 <h3 className="font-bold text-lg mb-2">Phone</h3>
//                 <p className="text-white/80 text-sm">{contact.phone}</p>
//               </div>

//               {/* Email */}
//               <div>
//                 <h3 className="font-bold text-lg mb-2">Email</h3>
//                 <p className="text-white/80 text-sm">{contact.email}</p>
//               </div>
//             </div>

//             {/* Mobile Social Icons */}
//             <div className="flex md:hidden justify-center gap-4 mt-10">
//               {contact.socialMedia.map((social) => {
//                 const Icon = socialIconMap[social.icon.toLowerCase()];

//                 if (!Icon) return null;

//                 return (
//                   <a
//                     key={social.name}
//                     href={social.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.name}
//                     className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition"
//                     style={{
//                       color: colors.secondary,
//                     }}
//                   >
//                     <Icon size={15} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Right Contact Form */}
//         <div
//           className="rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.25)] px-8 md:px-14 py-12"
//           style={{
//             backgroundColor: colors.background || "#070707",
//           }}
//         >
//           <h3 className="text-3xl font-extrabold text-center mb-10">
//             GET IN TOUCH
//           </h3>

//           <form className="space-y-7">
//             {contact.contactForm.fields.map((field) => (
//               <div key={field.name}>
//                 <label className="block text-sm text-white/70 mb-2">
//                   {field.label}
//                 </label>

//                 {field.type === "textarea" ? (
//                   <textarea
//                     name={field.name}
//                     rows={3}
//                     placeholder={field.placeholder}
//                     required={field.required}
//                     className="w-full bg-transparent border-b border-white/45 outline-none py-2 text-white placeholder:text-white/40 focus:border-white resize-none"
//                   />
//                 ) : (
//                   <input
//                     name={field.name}
//                     type={field.type}
//                     placeholder={field.placeholder}
//                     required={field.required}
//                     className="w-full bg-transparent border-b border-white/45 outline-none py-2 text-white placeholder:text-white/40 focus:border-white"
//                   />
//                 )}
//               </div>
//             ))}

//             <div className="flex justify-center pt-6">
//               <button
//                 type="submit"
//                 className="text-white px-20 py-4 rounded shadow-[8px_8px_0_rgba(0,0,0,0.18)] font-semibold transition hover:opacity-90"
//                 style={{
//                   backgroundColor: colors.primary,
//                 }}
//               >
//                 {contact.contactForm.buttonName}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { FormEvent, useState } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaTelegram,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import { portfolioContent } from "@/lib/portfolioContent";

const socialIconMap: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  x: FaXTwitter,
  youtube: FaYoutube,
  github: FaGithub,
  telegram: FaTelegram,
};

export default function ContactPage() {
  const { contact, platform } = portfolioContent;
  const colors = platform.brandColors;

  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSending(true);
    setNotification(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setNotification({
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      setNotification({
        type: "error",
        message: "Message failed to send. Please try again.",
      });
    } finally {
      setIsSending(false);

      setTimeout(() => {
        setNotification(null);
      }, 4500);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen text-white px-6 md:px-16 lg:px-24 py-24"
      style={{
        backgroundColor: colors.background || "#070707",
      }}
    >
      {/* Top Notification */}
      {notification && (
        <div className="fixed top-6 right-4 left-4 sm:left-auto z-[9999] flex justify-center sm:justify-end">
          <div
            className="w-full sm:w-[430px] rounded-2xl px-5 py-4 shadow-2xl border border-white/10 text-white animate-notification-slide"
            style={{
              backgroundColor:
                notification.type === "success"
                  ? colors.primary
                  : colors.secondary || "#202257",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">
                {notification.type === "success" ? "✓" : "!"}
              </div>

              <div>
                <p className="font-bold text-sm">
                  {notification.type === "success"
                    ? "Message Sent"
                    : "Message Failed"}
                </p>

                <p className="text-sm text-white/90 mt-1">
                  {notification.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotification(null)}
                className="ml-auto text-white/80 hover:text-white text-xl leading-none"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Contact Info */}
        <div className="relative">
          {/* Desktop Social Icons */}
          <div className="hidden md:flex flex-col gap-5 absolute left-0 top-1/2 -translate-y-1/2">
            {contact.socialMedia.map((social) => {
              const Icon = socialIconMap[social.icon.toLowerCase()];

              if (!Icon) return null;

              return (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition hover:scale-110"
                  style={{
                    color: colors.secondary,
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <div className="md:pl-24 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-8">
              CONTACT
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-xl mx-auto mb-12">
              {contact.description}
            </p>

            <div className="space-y-6">
              {/* Education */}
              <div>
                <h3 className="font-bold text-lg mb-2">Education</h3>

                <div className="space-y-3">
                  {contact.education.map((item, index) => (
                    <div key={index}>
                      <p className="text-white/90 text-sm font-semibold">
                        {item.schoolName}
                      </p>

                      {(item.degree || item.fieldOfStudy) && (
                        <p className="text-white/75 text-sm">
                          {item.degree}
                          {item.degree && item.fieldOfStudy ? " - " : ""}
                          {item.fieldOfStudy}
                        </p>
                      )}

                      {(item.startDate || item.endDate) && (
                        <p className="text-white/60 text-xs mt-0.5">
                          {item.startDate} - {item.endDate}
                        </p>
                      )}

                      {item.description && (
                        <p className="text-white/70 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-white/80 text-sm">{contact.phone}</p>
              </div>

              {/* Email */}
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-white/80 text-sm">{contact.email}</p>
              </div>
            </div>

            {/* Mobile Social Icons */}
            <div className="flex md:hidden justify-center gap-4 mt-10">
              {contact.socialMedia.map((social) => {
                const Icon = socialIconMap[social.icon.toLowerCase()];

                if (!Icon) return null;

                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition hover:scale-110"
                    style={{
                      color: colors.secondary,
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div
          className="rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.25)] px-8 md:px-14 py-12"
          style={{
            backgroundColor: colors.background || "#070707",
          }}
        >
          <h3 className="text-3xl font-extrabold text-center mb-10">
            GET IN TOUCH
          </h3>

          <form onSubmit={handleSubmit} className="space-y-7">
            {contact.contactForm.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-white/70 mb-2">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={3}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-transparent border-b border-white/45 outline-none py-2 text-white placeholder:text-white/40 focus:border-white resize-none"
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-transparent border-b border-white/45 outline-none py-2 text-white placeholder:text-white/40 focus:border-white"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSending}
                className="text-white px-12 sm:px-20 py-4 rounded shadow-[8px_8px_0_rgba(0,0,0,0.18)] font-semibold transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                {isSending ? "Sending..." : contact.contactForm.buttonName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}