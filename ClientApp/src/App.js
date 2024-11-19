import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import Articles from './pages/blog/Articles';
import ArticlesByCategory from './pages/blog/ArticlesByCategory';
import Article from './pages/blog/Article';
import Chatbot from './components/chatbot/Chatbot';
import ChatbotLoader from './components/chatbot/ChatbotLoader';
import Home from './pages/forum/Home';
import PostDetail from './pages/forum/PostDetail';
import Contact from './pages/contact/Contact';
import 'font-awesome/css/font-awesome.min.css';

function App() {
    const [admin, setAdmin] = useState(null);

    const handleLoginSuccess = (user) => {
        setAdmin(user);
    };

    return (
        <div className="App">
            <Header />
            <ChatbotLoader />
            <main>
                <Routes>
                    {/* Ruta za prijavu admina */}
                    <Route
                        path="/admin/admin-login"
                        element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
                    />

                    {/* Ruta za admin panel */}
                    <Route
                        path="/admin/admin-panel"
                        element={admin ? <AdminPanel /> : <p>Access Denied. Please log in as admin.</p>}
                    />
                    //Blog
                    <Route path="/blog/articles" element={<Articles />} />
                    <Route path="/blog/articles/:id" element={<ArticlesByCategory />} />
                    <Route path="/blog/article/:id" element={<Article />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    //Forum
                    <Route path="/forum" element={<Home />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    //Contact
                    <Route path="/contact" element={<Contact />} />
                    {/* Početna stranica */}
                    <Route
                        path="/"
                        element={<h2>Welcome to UNSA Student Helper!</h2>}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;