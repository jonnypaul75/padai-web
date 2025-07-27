

export default function Footer() {
    return (
        <footer id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className="footer-logo"><a className="navbar-brand logo" href="#"><img src="/padai-white.svg" className="w-25" /></a></div>
                        <p className="footer-description">
                            AI-powered educational platform making learning personalized, interactive, and effective.
                        </p>
                    </div>

                    <div className="col-md-3 col-6 mb-4">
                        <h4 className="footer-title">Features</h4>
                        <ul className="footer-links">
                            <li><a href="#">Learn</a></li>
                            <li><a href="#">Speak</a></li>
                            <li><a href="#">AI Tutor</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 col-6 mb-4">
                        <h4 className="footer-title">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Tutorials</a></li>
                        </ul>
                    </div>

                    <div className="col-md-2 col-6 mb-4">
                        <h4 className="footer-title">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-copyright">
                    © 2025 PadAI. All rights reserved.
                </div>
            </div>
        </footer>
    );

}
