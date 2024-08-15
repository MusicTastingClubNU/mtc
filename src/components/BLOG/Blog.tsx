import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import logo from "./logo.png";
import data from "./blogData.json";
import "./blog.css";
import { useMediaQuery } from "@mui/material";
import BlackButton from "../../BlackButton1";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Chip from "@mui/material/Chip";

interface Props {}

const StyledCardContent = styled(CardContent)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxHeight: "9em",
});

interface Review {
  reviewId: number;
  reviewTitle: string;
  reviewAuthor: string;
  reviewContent: string;
}

interface Article {
  articleId: number;
  articleTitle: string;
  articleAuthor: string;
  articleContent: string;
}

interface ReviewsData {
  Reviews: Review[];
}

interface ArticlesData {
  Articles: Article[];
}
const Blog: React.FC = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<{
    contId: number;
    contTitle: string;
    contAuthor: string;
    contContent: string;
  } | null>(null);

  useEffect(() => {
    const reviewsData = (data[0] as ReviewsData).Reviews;
    const articlesData = (data[1] as ArticlesData).Articles;

    setReviews(reviewsData);
    setArticles(articlesData);
  }, []);

  useEffect(() => {
    if (selectedBlog !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedBlog]);

  return (
    <React.Fragment>
      <TitleAndDirectory />
      {selectedBlog == null ? (
        <React.Fragment>
          {isMobile ? <br></br> : null}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Articles</h2>
            <div className="blog-items-cont">
              {articles.map((article) => (
                <div className="blog-items" key={article.articleId}>
                  <Card
                    sx={{ marginBottom: 2 }}
                    key={article.articleId}
                    onClick={() => {
                      setSelectedBlog({
                        contId: article.articleId,
                        contTitle: article.articleTitle,
                        contAuthor: article.articleAuthor,
                        contContent: article.articleContent,
                      });
                    }}
                  >
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
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginTop: -1 }}
                        >
                          Written By {article.articleAuthor}
                        </Typography>
                        <Chip
                          label="Short Review"
                          size="small"
                          sx={{ marginTop: -1, backgroundColor: "lightgreen" }}
                        ></Chip>
                        <br />
                      </StyledCardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {isMobile ? <br /> : null}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Reviews</h2>
            <div className="blog-items-cont">
              {reviews.map((review) => (
                <div className="blog-items" key={review.reviewId}>
                  <Card
                    sx={{ marginBottom: 2 }}
                    key={review.reviewId}
                    onClick={() => {
                      setSelectedBlog({
                        contId: review.reviewId,
                        contTitle: review.reviewTitle,
                        contAuthor: review.reviewAuthor,
                        contContent: review.reviewContent,
                      });
                    }}
                  >
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
                          Written By {review.reviewAuthor}
                        </Typography>
                      </StyledCardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <>
          {isMobile ? <br /> : null}
          <div className="blog-cont2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => {
                  setSelectedBlog(null);
                }}
                style={{ position: "absolute", left: 0 }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <h1 style={{ textAlign: "center", color: "gray" }}>
                {selectedBlog?.contTitle}
              </h1>
            </div>
            <h5>{selectedBlog?.contContent}</h5>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Blog;
