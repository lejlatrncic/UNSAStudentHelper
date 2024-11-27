import React from 'react';
import './CarouselComponent.css';

const CarouselComponent = ({ openChatbot }) => {
    return (
        <div id="customCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {/* Slide 1 */}
                <div className="carousel-item active">
                    <img
                        src="https://img.freepik.com/premium-photo/womans-head-exploding-with-overwhelming-information-symbolizing-emotional-burnout-mental-health-challenges-concept-emotional-burnout-mental-health-challenges-stress-management_918839-146785.jpg"
                        className="d-block w-100 carousel-image"
                        alt="Dobrodošlica"
                    />
                    <div className="carousel-caption text-center">
                        <h1 className="carousel-title">Dobrodošli</h1>
                        <p className="carousel-text">
                            Otkrijte alat za podršku studentima UNSA. Povežite se, učite i rastite zajedno!
                        </p>
                        <button onClick={openChatbot} className="btn btn-primary btn-lg">
                            Pokreni Chatbot
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item">
                    <img
                        src="https://img.freepik.com/premium-photo/navigating-complexities-mental-health-illustration-labyrinthine-setting-concept-mental-health-awareness-complexity-mental-health-labyrinth-illustration-navigating-challenges_918839-144085.jpg"
                        className="d-block w-100 carousel-image"
                        alt="Blog"
                    />
                    <div className="carousel-caption text-left">
                        <h1 className="carousel-title">Anti-stres Blog</h1>
                        <p className="carousel-text">Pronađite savjete, vježbe i inspiraciju za smanjenje stresa.</p>
                        <a href="/blog" className="btn btn-success btn-lg">
                            Posjeti Blog
                        </a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="carousel-item">
                    <img
                        src="https://img.freepik.com/premium-photo/symbolic-representation-burnout-coffee-cup-splashing-into-human-head-shape-blue-background-concept-burnout-work-stress-mental-health-coffee-human-head-shape-blue-background_918839-154251.jpg"
                        className="d-block w-100 carousel-image"
                        alt="Forum"
                    />
                    <div className="carousel-caption text-right">
                        <h1 className="carousel-title">Forum Zajednica</h1>
                        <p className="carousel-text">Pridruži se i podijeli svoja iskustva s kolegama studentima.</p>
                        <a href="/forum" className="btn btn-warning btn-lg">
                            Idi na Forum
                        </a>
                    </div>
                </div>
            </div>

            {/* Carousel Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#customCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#customCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CarouselComponent;
