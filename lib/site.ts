/**
 * Central source of truth for external links, contact facts, and brand constants.
 * Everything that points "outside" the app (WhatsApp, booking, social, maps, PDF)
 * lives here so it can be edited in one place.
 */

export const SITE = {
  name: "RAM Sustainable Development",
  nameAr: "رام للتنمية المستدامة",
  shortName: "RAM",
  legalName: "RAM Sustainable Development CO.",
  // Update once the new site is deployed to its production domain.
  url: "https://ramsdgroup.com",
  email: "info@ramsdgroup.com",
  // E.164 phone, and a digits-only variant for the WhatsApp deep link.
  phoneDisplay: "+968-71712701",
  phoneE164: "+96871712701",
  whatsappNumber: "96871712701",
  location: {
    ar: "مسقط – سلطنة عُمان",
    en: "Muscat – Sultanate of Oman",
    lat: 23.576576,
    lng: 58.3794688,
  },
} as const;

export const LINKS = {
  whatsapp: `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`,
  whatsappChannel: "https://whatsapp.com/channel/0029Vam2u0T5q08a7BHZrK3t",
  instagram: "https://www.instagram.com/ram_tr_om?igsh=Ymd1aTBpNXliNzdn",
  email: `mailto:${SITE.email}`,
  phone: `tel:${SITE.phoneE164}`,
  // Google Calendar appointment scheduler (opened in the booking modal / new tab).
  booking:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-6RYa4kpnXBkn1Rt-wHynsb1_OQd-GDsu5PMp7v83GKl4tO4gX1PhEsE4ZFrrdpX6Dsb75jsh?gv=true",
  // Company profile PDF (Google Drive).
  companyProfile:
    "https://drive.google.com/file/d/1ck2c5fqffn_BbOq96NI9p-leHA3YoWvh/view?usp=sharing",
  // Driving directions to the office (Google Maps share link).
  mapsDirections: "https://maps.app.goo.gl/YS1HWK81eW1KoZL48",
  // Embeddable map pinned to the exact office location via place ID.
  mapsEmbed:
    "https://maps.google.com/maps?q=رام+للتنمية+المستدامة,+Ghala,+Muscat,+Oman&ftid=0x3e91ffe32e15f0db:0x81eaf548b998d67b&output=embed&z=16",
} as const;

/** Navigation order: Home → Debt → Travel → About → Contact. */
export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "debt", href: "/debt" },
  { key: "travel", href: "/travel" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
