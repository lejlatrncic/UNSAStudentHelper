import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleLink.css';

function ArticleLink({ articleId, imageUrl, articleName }) {
    return (
        <Link to={`/blog/article/${articleId}`} className="article-link">
            <div className="article-card">
                <img
                    src={imageUrl}
                    alt={articleName}
                    className="article-image w-100"
                />
                <p className="">{articleName}</p>
            </div>
        </Link>
    );
}

export default ArticleLink;