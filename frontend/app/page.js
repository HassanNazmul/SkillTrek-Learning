import Hero from "@/components/LandingPage/Horo/Hero";
import ReviewSection from "@/components/LandingPage/review/ReviewSection";
import ServiceCard from "@/components/LandingPage/Service/ServiceCatalogue";

export default function Home() {
    return (
        <div>
            <Hero />
            <ReviewSection />
            <div id="service"><ServiceCard/></div>
        </div>
    );
}
