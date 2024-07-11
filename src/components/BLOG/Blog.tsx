import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import logo from './logo.png';
import data from './blogData.json';
import "./blog.css"
import { useMediaQuery } from '@mui/material';
import BlackButton from '../../BlackButton1';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const StyledCardContent = styled(CardContent)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '9em',
});


const shortenedText = (text: string, len: number): string => {
    if (text.length < len) return text;
    let trunc = text.slice(0, len);
    const lastSpaceIndex = trunc.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
        trunc = trunc.slice(0, lastSpaceIndex);
    }
    return trunc + '...';
};


interface Review {
    reviewId: number;
    reviewTitle: string;
    reviewContent: string;
}

interface Article {
    articleId: number;
    articleTitle: string;
    articleContent: string;
}

interface ReviewsData {
    Reviews: Review[];
}

interface ArticlesData {
    Articles: Article[];
}
const Blog: React.FC = () => {
    const isMobile =  useMediaQuery('(max-width: 768px)');

    const [reviews, setReviews] = useState<Review[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [isBlogCont, setIsBlogCont] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<{ contId: number; contTitle: string; contContent: string;} | null>(null);



    useEffect(() => {
        const reviewsData = (data[0] as ReviewsData).Reviews;
        const articlesData = (data[1] as ArticlesData).Articles;

        const truncatedReviews = reviewsData.map(review => ({
            ...review,
            reviewContent: shortenedText(review.reviewContent, 200),
        }));

        const truncatedArticles = articlesData.map(article => ({
            ...article,
            articleContent: shortenedText(article.articleContent, 200),
        }));

        setReviews(truncatedReviews);
        setArticles(truncatedArticles);
    }, []);

    return (
        <React.Fragment>
        {isBlogCont ? 
        
        ( <div className={isMobile ? "blog-cont2" : "blog-cont"}>
            <IconButton onClick={() => {setIsBlogCont(!isBlogCont); setSelectedBlog(null);}}><ArrowBackIosNewIcon></ArrowBackIosNewIcon></IconButton>
            <h1 style={{textAlign:"center",color:"gray"}}>{selectedBlog?.contTitle}</h1>
            <h5>{selectedBlog?.contContent}</h5>
        </div>)
        : 
        
        (
            <React.Fragment>
        {isMobile ? (<br></br>) : null} 
        <div className={isMobile ? "blog-cont2" : "blog-cont"}>
            <h2 className="blog-titles">Club Articles</h2>
            <div className="blog-items-cont">
            {articles.map((article) => (
                <div className="blog-items" key={article.articleId}>
                <Card sx={{  marginBottom: 2 }} key={article.articleId} onClick={() => { setIsBlogCont(true); setSelectedBlog({contId:article.articleId,contTitle:article.articleTitle,contContent: article.articleContent}); }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={logo}
                            alt="article image"
                        />
                        <StyledCardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {article.articleTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {article.articleContent}
                            </Typography>
                        </StyledCardContent>
                    </CardActionArea>
                </Card>
                </div>
            ))}
            </div>
        </div>
        {isMobile ? (<br></br>) : null} 
        <div className={isMobile ? "blog-cont2" : "blog-cont"}>
            <h2 className="blog-titles">Club Reviews</h2>
            <div className="blog-items-cont">
            {reviews.map((review) => (
                <div className="blog-items" key={review.reviewId}>
                <Card sx={{ marginBottom: 2 }} key={review.reviewId} onClick={() => { setIsBlogCont(true); setSelectedBlog({contId:review.reviewId,contTitle:review.reviewTitle,contContent: review.reviewContent}); }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={logo}
                            alt="review image"
                        />
                        <StyledCardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {review.reviewTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {review.reviewContent}
                            </Typography>
                        </StyledCardContent>
                    </CardActionArea>
                </Card>
                </div>
            ))}
            </div>
        </div>
        </React.Fragment>
         )}
       
         
        </React.Fragment>
          
    );
};

export default Blog;
