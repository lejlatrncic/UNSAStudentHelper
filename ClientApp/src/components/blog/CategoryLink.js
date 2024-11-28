import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryLink.css';

function CategoryLink({ categoryId, imageUrl, categoryName }) {
    return (
        <Link to={`/blog/articles/${categoryId}`} className="category-link">
            <div className="category-card">
                <img
                    src={imageUrl}
                    alt={categoryName}
                    className="category-image"
                />
                <h3 className="category-title">{categoryName}</h3>
            </div>
        </Link>
    );
}

export default CategoryLink;