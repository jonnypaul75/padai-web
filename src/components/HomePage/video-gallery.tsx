export default function VideoGallery() {
    return (

        <section className="container my-5">
            <div className="text-center mb-4">
                <h2 className="companion-title">Video Learning Gallery</h2>
                <p className="companion-subtitle">
                    Watch curated learning content to understand topics visually.
                </p>
            </div>
            <div className="row">
                <div className="col-lg-8 mb-4">
                    <div className="ratio ratio-16x9">
                        <iframe
                            src="https://www.youtube.com/embed/9bZkp7q19f0"
                            title="Main Learning Video"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row g-3">
                        <div className="col-6 col-lg-12">
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.youtube.com/embed/9bZkp7q19f0"
                                    title="Video 2"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="col-6 col-lg-12">
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                    title="Video 4"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
}