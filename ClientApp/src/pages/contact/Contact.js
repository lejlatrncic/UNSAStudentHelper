import React from 'react';

const Contact = () => {
    return (
        <div className="container-fluid mt-4">
            <div
                className="container-fluid position-relative text-center text-white py-5"
                style={{
                    backgroundImage: `url('https://thumbs.dreamstime.com/b/digital-consciousness-brain-potential-ideas-innovation-free-your-mind-digital-consciousness-brain-potential-ideas-329514352.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                ></div>
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h1 className="text-primary">KONTAKTIRAJ PSIHOLOGA</h1>
                    <p className="mx-auto" style={{ maxWidth: "800px" }}>
                        Ako ti je potrebna stručna podrška u suočavanju sa stresom, anksioznošću ili bilo kojim drugim izazovom, slobodno se obrati našem psihologu. Psiholog je tu da ti pomogne, sasluša te i pruži savjet kako bi se osjećao/la bolje i sigurnije. Tvoj korak prema podršci može biti važan put ka emocionalnoj ravnoteži i akademskom uspjehu.
                    </p>
                </div>
            </div>
            <div className="row">
                {/* Map Column */}
                <div className="col-lg-4 col-12" >
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.4591787559461!2d18.39400615117011!3d43.85687142728512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c9246e016a2b%3A0x5515e4d7b224b818!2sPoljoprivredno-prehrambeni%20fakultet%20Univerziteta%20u%20Sarajevu!5e1!3m2!1shr!2sba!4v1731571053872!5m2!1shr!2sba"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Information */ }
                    < div className="col-lg-4 col-12 d-flex flex-column py-5 px-3" style={{
                        backgroundColor: "white",
                    }}>
                    <h4>POSJETITE NAS</h4>
                    <p className="text-muted">Molimo da se prethodno najaviš kako bismo osigurali da dobiješ potrebnu podršku u odgovarajućem terminu.</p>
                    <div>
                        <p><i className="fa fa-university" aria-hidden="true"></i> Ured za podršku studentima (UPS!)</p>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> Zmaja od Bosne br. 8</p>
                        <p><i className="fa fa-city" aria-hidden="true"></i> 71000 Sarajevo</p>
                    </div>
                </div>

                {/* Contact */}
                <div className="col-lg-4 col-12 d-flex flex-column py-5 px-3" style={{ backgroundColor: 'lightcyan' }}>
                    <h4>KONTAKTIRAJTE NAS</h4>
                    <div>
                        <p><i className="fa fa-phone" aria-hidden="true"></i> br. tel.: +387 33 668 251</p>
                        <p><i className="fa fa-envelope" aria-hidden="true"></i> e-mail: ured@unsa.ba</p>
                    </div>

                    <div className="d-flex justify-content-start mt-3">
                        <a href="tel:+38733668251" className="btn btn-outline-primary me-2" style={{ fontSize: '14px' }}>Pozovi</a>
                        <a href="mailto:ured@unsa.ba" className="btn btn-outline-secondary" style={{ fontSize: '14px' }}>Pošalji mail</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;

