import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Stack } from "@/components/Stack";
import { Path } from "@/components/Path";
import { OffClock } from "@/components/OffClock";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Stack />
      <Path />
      <OffClock />
      <Contact />
    </>
  );
}
