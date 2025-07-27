import { FaSmile, FaStar } from "react-icons/fa";

export default function Testimonial() {
    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <h2 className="text-center mb-3">What Our Students Say</h2>
                <p className="text-center mb-5">
                    Hear from students who have transformed their learning experience with
                    our AI-powered platform.
                </p>

                <div className="row g-4 justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="testimonial-card">
                            <div className="d-flex align-items-center mb-3">
                                <FaSmile className="text-warning me-2" />
                                <div>
                                    <div className="testimonial-student">Student 1</div>
                                    <div className="testimonial-className">className 9, CBSE</div>
                                </div>
                            </div>
                            <div className="testimonial-stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className="testimonial-text">
                                "The AI tutor has been incredibly helpful. It explains difficult
                                concepts in a way that's easy to understand and always answers
                                my questions promptly."
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="testimonial-card">
                            <div className="d-flex align-items-center mb-3">
                                <FaSmile className="text-warning me-2" />
                                <div>
                                    <div className="testimonial-student">Student 2</div>
                                    <div className="testimonial-className">className 10, ICSE</div>
                                </div>
                            </div>
                            <div className="testimonial-stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className="testimonial-text">
                                "The AI tutor has been incredibly helpful. It explains difficult
                                concepts in a way that's easy to understand and always answers
                                my questions promptly."
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="testimonial-card">
                            <div className="d-flex align-items-center mb-3">
                                <FaSmile className="text-warning me-2" />
                                <div>
                                    <div className="testimonial-student">Student 3</div>
                                    <div className="testimonial-className">className 11, CBSE</div>
                                </div>
                            </div>
                            <div className="testimonial-stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className="testimonial-text">
                                "The AI tutor has been incredibly helpful. It explains difficult
                                concepts in a way that's easy to understand and always answers
                                my questions promptly."
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}