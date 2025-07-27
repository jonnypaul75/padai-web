import { FaBook } from "react-icons/fa";
import { FaBookOpen, FaComments } from "react-icons/fa6";



export default function KeyFeature() {
    return (
        <section id="features" className="features py-5">
            <div className="container">
                <div className="features-header">Key Features</div>
                <h2 className="features-title">AI-Powered Learning Tools</h2>
                <p className="features-subtitle">Our platform offers a suite of AI-powered tools designed to transform how you learn, making education more interactive, personalized, and effective.</p>

                <div className="row g-4 justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaBook />
                            </div>
                            <h3 className="feature-title">Learn (NCERT AI Tutor)</h3>
                            <p className="feature-description">AI-powered tutoring based on NCERT curriculum for all subjects and classes.</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaComments />
                            </div>
                            <h3 className="feature-title">Speak (Language Learning)</h3>
                            <p className="feature-description">Practice conversations and improve pronunciation with AI language tutors.</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaBookOpen />
                            </div>
                            <h3 className="feature-title">Read (Story books)</h3>
                            <p className="feature-description">Read Story Books • Explore Magical Worlds 🪄 — Let your journey begin—one story at a time! 📚</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


