import { useState } from "react";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container">
                    <a className="navbar-brand logo" href="/"><img src="/padai.svg" className="w-100" /></a>
                    <div className="d-flex align-items-center">
                        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`${isOpen ? 'showMenu' : ''} menu d-lg-flex align-items-center`} id="navbarNav">
                            <a className="navbar-brand logo d-block d-lg-none" href="/"><img src="/padai.svg" className="w-100" /></a>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#testimonials">Learn</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                            </ul>

                        </div>
                        <a href="#" className="btn btn-primary ms-3">Get Started</a>
                    </div>
                </div>
            </nav>
        </header>
    );

}
