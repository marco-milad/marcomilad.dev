import { Background } from "@/components/home/Background";
import { Capabilities } from "@/components/home/Capabilities";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ProofStrip } from "@/components/home/ProofStrip";
import { StackMap } from "@/components/home/StackMap";

/**
 * Who I am → what I build → proof → how I work → what with → where I come
 * from → talk to me. Every section reads from the content layer, so the home
 * page cannot claim more than the case studies support.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Capabilities />
      <FeaturedWork />
      <Process />
      <StackMap />
      <Background />
      <FinalCta />
    </>
  );
}
