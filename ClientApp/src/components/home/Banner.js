import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'; // Dodata CSS datoteka za stilove slike

const Banner = () => {
    return (
        <div className="position-relative overflow-hidden">
            {/* Tekst na slici */}
            <div className="position-absolute top-50 start-0 translate-middle-y text-light px-3">
                <div className="container">
                    <p className="fs-5 text-dark fw-light fst-italic">
                        Podijelite svoje akademske brige, probleme i postignuća, zatražite savjet, pomozite drugom.
                    </p>
                    <Link to="/forum" className="btn btn-primary btn-lg mt-3">
                        FORUM
                    </Link>
                </div>
            </div>

            {/* Pozadinska slika */}
            <img
                src="https://img.freepik.com/premium-photo/concept-brainstorming-artificial-intelligence-with-blue-color-human-brain-background_121658-753.jpg"
                alt="Banner background"
                className="banner-image"
            />
        </div>
    );
};

export default Banner;
