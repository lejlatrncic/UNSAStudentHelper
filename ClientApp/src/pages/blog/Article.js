import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle, fetchCategories } from '../../firebase';
import Categories from '../../components/blog/Categories';
import ArticlesList from '../../components/blog/ArticlesList';

const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const loadArticleAndCategories = async () => {
            try {
                const articleData = await fetchArticle(id);
                setArticle(articleData);

                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error loading article or categories:", error);
            }
        };

        loadArticleAndCategories();
    }, [id]);

    return (
        <div className="container-fluid mt-4">
            {article ? (
                <div className="row">
                    {/* Main article content */}
                    <div className="col-md-9 col-sm-12">
                        <Categories />
                        <h1>{article.title}</h1>
                        <img src={article.imageURL} alt={article.title} className="img-fluid w-100 mb-5" />
                        <p className="text-secondary">Kreirao/la: {article.createdBy}</p>
                        <p>{article.content}</p>
                        {/* Display video if videoURL exists */}
                        {article.videoURL && (
                            <iframe
                                src={article.videoURL.replace("watch?v=", "embed/")}
                                title="YouTube video player"
                                style={{ width: "80%", height: "450px", border: "none" }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>

                    {/* Sidebar with ArticlesList on the right */}
                    <div
                        className="col-md-3 d-none d-md-block"
                        style={{
                            position: 'sticky',
                            top: '20px', // Razmak sa vrha
                            height: 'calc(100vh - 20px)', // Visina ekrana minus razmak
                            overflowY: 'auto', // Omogućava skrolovanje unutar sidebara
                        }}
                    >
                        <h5 className="text-center">Preporučeni članci</h5>
                        <ArticlesList />
                    </div>
                </div>
            ) : (
                <p>Loading article...</p>
            )}
        </div>
    );
};

export default Article;