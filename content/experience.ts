/**
 * Roles, as stated in Marco's CV and confirmed 2026-09-19.
 *
 * `projects` links a role to case studies produced in it. M.M Bags and the
 * gold ERP are deliberately not attached to an employer: they were built
 * independently, and attributing them to an agency would be wrong.
 */
export type Role = {
  org: string;
  title: string;
  start: string;
  end: string | "present";
  location: string;
  summary: string;
  highlights?: string[];
  projects?: string[];
};

export const experience: Role[] = [
  {
    org: "elama.ai",
    title: "Junior Software Engineer · Product Engineer",
    // March 2026, confirmed by Marco 2026-10-22 against the current CV. The
    // earlier "March 2025" came from the previous CV header and was wrong by a
    // year; it also put the role a year ahead of The Intern, which began at the
    // same time.
    start: "March 2026",
    end: "present",
    location: "Cairo — remote",
    summary:
      "End-to-end engineer on client products, from requirements and business analysis through to implementation and post-launch maintenance.",
    highlights: [
      "Sole engineer on The Intern, an AI internship platform live on web, iOS and Android",
      "Owns delivery across all three platforms on live production systems",
    ],
    projects: ["the-intern"],
  },
  {
    org: "Triple Vision Agency",
    title: "Junior Product Engineer · Software Engineer (part-time)",
    start: "November 2025",
    end: "present",
    location: "Cairo",
    summary:
      "Sole front-end point of contact for international clients, owning architecture and stack decisions from discovery through to deployment.",
    highlights: [
      "Shipped production projects across healthcare, legal, media and advertising",
      "Translated design files into component systems averaging 40+ reusable components per project",
    ],
    projects: ["ray-lab"],
  },
  {
    org: "ITI — Information Technology Institute",
    title: "Front-End Development Trainee (part-time)",
    start: "September 2025",
    end: "December 2025",
    location: "Cairo",
    summary:
      "Intensive front-end track. Built a full-stack marketplace clone with authentication, cart, orders, payments and an admin panel.",
  },
  {
    org: "DEPI — Digital Egypt Pioneers Initiative",
    title: "Mobile Development Intern",
    start: "June 2024",
    end: "October 2024",
    location: "Remote",
    summary:
      "Mobile development track covering Android and cross-platform fundamentals, in a government-backed upskilling programme.",
  },
];

export const education = {
  // As printed on the CV, confirmed 2026-10-22. Previously recorded as a BSc in
  // Computer Science graduating 2021, which was wrong on both the award and the
  // dates.
  degree: "Bachelor of Information Technology",
  school: "Faculty of Computers and Information, Assiut University",
  year: "2020 – 2024",
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  /**
   * The track exactly as the certificate names it, where that differs from the
   * short name above. Printed rather than paraphrased: these are the words a
   * reader can check against the document itself.
   */
  track?: string;
  /** The certificate, served from public/credentials. */
  href?: string;
  /** Rough size, so a link to a PDF says what it will cost to open. */
  fileNote?: string;
};

/**
 * Newest first. The two government programmes carry their scanned certificates;
 * the dates and track names on these entries are taken from the documents, not
 * from the CV, where both differ.
 */
export const certifications: Certification[] = [
  { name: "Claude 101", issuer: "Anthropic Education", date: "April 2026" },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "April 2026",
  },
  {
    name: "Information Technology Institute (ITI)",
    issuer: "Ministry of Communications and Information Technology, Egypt",
    date: "July – November 2025",
    track: "Front-end and Cross-Platform Mobile Development Track",
    href: "/credentials/iti-frontend-cross-platform-mobile.pdf",
    fileNote: "PDF, 408 KB",
  },
  {
    name: "Digital Egypt Pioneers Program (DEPI)",
    issuer: "Ministry of Communications and Information Technology, Egypt",
    date: "April – October 2024",
    track: "Software Development — Mobile App Developer",
    href: "/credentials/depi-mobile-app-developer.pdf",
    fileNote: "PDF, 520 KB",
  },
];
