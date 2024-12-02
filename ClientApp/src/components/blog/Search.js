import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Preusmjeri na stranicu za rezultate pretrage
            navigate(`/blog/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar d-flex my-3">
            <input
                type="text"
                className="form-control me-2"
                placeholder="Pretraži članke..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*<button type="submit" className="btn btn-primary">*/}
            {/*    Pretraži*/}
            {/*</button>*/}
        </form>
    );
};

export default Search;
