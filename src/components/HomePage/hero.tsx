
import { FaLock, FaRobot } from "react-icons/fa";
import { FaArrowRight, FaCircleCheck, FaGraduationCap, FaQuestion } from "react-icons/fa6";


export default function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="mb-2">
                            <small className="text-muted">AI-Powered Learning</small>
                        </div>
                        <h1>Learn Smarter with <span className="primary">AI</span><br />That <span className="secondary">Understands You</span></h1>
                        <p>Personalized AI tutoring that adapts to your learning style, answers all your questions, and helps you master any subject.</p>
                        <div className="d-flex flex-wrap gap-2">
                            <a href="/dashboard" className="btn btn-primary">Get Started Free</a>
                            <a href="#" className="btn btn-outline-primary">See How It Works</a>
                        </div>
                        <div className="mt-4">
                            <small className="text-muted">
                                <span className="d-inline-flex align-items-center justify-content-center">
                                    <FaCircleCheck className="benefits-icon" />Free to start
                                </span>
                                <span className="d-inline-flex align-items-center justify-content-center">
                                    <FaLock className="benefits-icon ms-3" />No credit card
                                </span>
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-4 mt-lg-0 position-relative">
                        <div className="chat-container-circle"></div>
                        <div className="chat-container mx-auto mx-lg-0">
                            <div className="chat-header-hero">
                                <div className="chat-title-hero">NCERT AI Tutor</div>
                                <div className="chat-status-hero">Active</div>
                            </div>

                            <div className="chat-subject-hero">
                                <div className="chat-subject-icon-hero">
                                    <FaGraduationCap />
                                </div>
                                <div className="chat-subject-text">
                                    <h3>Class 10 - Science</h3>
                                    <p>Chapter 3: Force and Laws of Motion</p>
                                </div>
                            </div>

                            <div className="chat-question-container">
                                <div className="chat-question-header">
                                    <div className="chat-question-icon">
                                        <FaQuestion />
                                    </div>
                                    <div className="chat-question-label">Question</div>
                                </div>
                                <div className="chat-question">
                                    Can you explain Newton's Third Law with examples?
                                </div>
                            </div>

                            <div className="chat-answer">
                                <div className="chat-answer-icon">
                                    <FaRobot />
                                </div>
                                <div className="chat-answer-text">
                                    Newton's Third Law states that for every action, there is an equal and opposite reaction...
                                </div>
                            </div>

                            <div className="chat-input-container-hero">
                                <input type="text" className="chat-input-hero" placeholder="Ask a question..." />
                                <button className="chat-send-btn-hero">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


