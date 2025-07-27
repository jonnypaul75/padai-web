import { FaCircleCheck } from "react-icons/fa6";

export default function StudyCompanion() {
    return (
        <section className="container study-companion">
            <div className="row align-items-center">
                <div className="col-lg-5 mb-4 mb-lg-0">
                    <img
                        src="/creativity-1.png"
                        alt="Rocket illustration"
                        className="rocket-img w-75"
                    />
                </div>
                <div className="col-lg-7">
                    <div className="mb-2">
                        <small className="text-muted">AI Tutor</small>
                    </div>
                    <h2 className="companion-title">Your Personal Study Companion</h2>
                    <p className="companion-subtitle">
                        Our AI tutor adapts to your learning style, answers your questions
                        in real-time, and provides personalized explanations for any NCERT
                        subject.
                    </p>

                    <div className="companion-feature">
                        <FaCircleCheck />
                        <div>Personalized learning path based on your needs</div>
                    </div>

                    <div className="companion-feature">
                        <FaCircleCheck />
                        <div>Instant doubt resolution with detailed explanations</div>
                    </div>

                    <div className="companion-feature">
                        <FaCircleCheck />
                        <div>Practice problems with step-by-step solutions</div>
                    </div>

                    <div className="companion-feature">
                        <FaCircleCheck />
                        <div>Covers all CBSE, ICSE and State Board curricula</div>
                    </div>

                    <div className="mt-4">
                        <a href="/dashboard" className="btn btn-primary">Start Learning Now</a>
                    </div>
                </div>
            </div>
        </section>
    );
}