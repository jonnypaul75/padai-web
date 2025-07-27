import CTA from "../../components/HomePage/cta";
import Hero from "../../components/HomePage/hero";
import KeyFeature from "../../components/HomePage/key-feature";
import StudyCompanion from "../../components/HomePage/study-companion";
import Testimonial from "../../components/HomePage/testimonial";
import VideoGallery from "../../components/HomePage/video-gallery";

export default function HomePage() {

  return (
   <>
   <Hero />
   <KeyFeature />
   <StudyCompanion />
   <VideoGallery />
   <Testimonial />
   <CTA />
   </>
  );
}
