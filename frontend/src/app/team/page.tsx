import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import TeamPartnersSection from "@/components/sections/team-partners-section";

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <TeamPartnersSection />
      </main>
      <Footer />
    </div>
  );
}

