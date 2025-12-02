import HomeSection from "@/components/Home/HomeSection";
import WorkSection from "@/components/Work/WorkSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <HomeSection />
      <div className=" h-1 bg-gray-600/50 max-w-5xl mx-auto rounded-lg"></div>
      <WorkSection />
      <div className=" h-1 bg-gray-600/50 max-w-5xl mx-auto rounded-lg"></div>
      <ContactSection />
      <Footer />
    </>
  );
}
