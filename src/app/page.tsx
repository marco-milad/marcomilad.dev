import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { Background } from "@/components/home/Background";
import { Capabilities } from "@/components/home/Capabilities";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ProjectsTimeline } from "@/components/home/ProjectsTimeline";
import { ProofStrip } from "@/components/home/ProofStrip";
import { StackMap } from "@/components/home/StackMap";

export const metadata: Metadata = {
  // absolute: the layout's "%s — Marco Milad" template would duplicate the name.
  title: {
    absolute: "Marco Milad — Product Engineer (React, Next.js, TypeScript)",
  },
  description:
    "Product engineer in Cairo taking digital products from idea to production: e-commerce and retail operations, ERP and POS, enterprise platforms and AI products.",
  alternates: { canonical: "/" },
};

/**
 * Who I am → what I build → proof → how I work → what with → where I come
 * from → talk to me. Every section reads from the content layer, so the home
 * page cannot claim more than the case studies support.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <Hero />
      <ProofStrip />
      <Capabilities />
      <FeaturedWork />
      <ProjectsTimeline />
      <Process />
      <StackMap />
      <Background />
      <FinalCta />
    </>
  );
}
