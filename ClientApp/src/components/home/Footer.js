import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: '#0a4275' }}>
            <div className="container py-4">

                {/* Centar - Linkovi */}
                <div className="text-center">
                    <Link to="/blog/articles" className="text-white mx-3">Blog</Link>
                    <Link to="/forum" className="text-white mx-3">Forum</Link>
                </div>

            </div>

            {/* Dno - Powered by */}
            <div className="text-center py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <p className="mb-0 text-primary">Powered by Lejla Trnčić <i className="fa fa-heart-o" aria-hidden="true"></i></p>
            </div>
        </footer>
    );
};

export default Footer;
