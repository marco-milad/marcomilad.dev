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
    title: "Software Engineer · Product Engineer",
    start: "March 2025",
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
    title: "Software Engineer · Front-End Developer (part-time)",
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
  degree: "BSc in Computer Science",
  school: "Faculty of Computers and Information, Assiut University",
  year: "2021",
};

export const certifications = [
  { name: "Claude 101", issuer: "Anthropic Education", date: "April 2026" },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "April 2026",
  },
];
