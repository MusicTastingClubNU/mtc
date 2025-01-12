import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import data from "./blogData.json";
import "./blog.css";
import { useMediaQuery } from "@mui/material";
import BlackButton from "../../BlackButton1";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Chip from "@mui/material/Chip";
import logo from "../../imgs/MTC_logo.png";
import BlogSubmissionForm from "./BlogSubmissionForm";

interface Props {}

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "auto",
  fontFamily: "Roboto-Regular",
});

interface Blog {
  blogId: number;
  blogTitle: string;
  blogAuthor: string;
  blogContent: string;
  blogImg: string;
}

interface BlogData {
  Blogs: Blog[];
}
const Blog: React.FC = (props: Props) => {
  //Checks the mobile component
  const isMobile = useMediaQuery("(max-width: 768px)");

  //This sets the inner content when you click into a review or email.
  //When it's null, you're on the main Blog page, but when there's a value,
  //the user is in a review/email.
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<{
    contId: number;
    contTitle: string;
    contAuthor: string;
    contContent: string;
    contImg: string;
  } | null>(null);

  useEffect(() => {
    setBlogs(data);
  }, []);

  useEffect(() => {
    if (selectedBlog !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedBlog]);
  return (
    <>
      <TitleAndDirectory />

      {selectedBlog == null ? (
        <>
          {isMobile ? <br></br> : null}
          {/*||| CLUB ALBUM REVIEWS COMPONENT ||| */}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Album Reviews</h2>
            <div className="blog-items-cont">
              {/* The album reviews have IDs that are more than or equal to 0 (the reason for
                 .filter((blog) => blog.blogId >= 0)*/}
              {blogs
                .filter((blog) => blog.blogId >= 0)
                .map((blog) => (
                  <div className="blog-items" key={blog.blogId}>
                    <Card
                      sx={{ marginBottom: 2 }}
                      key={blog.blogId}
                      onClick={() => {
                        setSelectedBlog({
                          contId: blog.blogId,
                          contTitle: blog.blogTitle,
                          contAuthor: blog.blogAuthor,
                          contContent: blog.blogContent,
                          contImg: blog.blogImg,
                        });
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={blog.blogImg ? blog.blogImg : logo}
                          alt="article image"
                        />
                        <StyledCardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {blog.blogTitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginTop: -1 }}
                          >
                            Written By {blog.blogAuthor}
                          </Typography>
                        </StyledCardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
          {/*||| CLUB EMAILS COMPONENT ||| */}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Emails</h2>
            <div className="blog-items-cont">
              {/* The club emails have IDs that are smaller than 0 (the reason for
                 .filter((blog) => blog.blogId < 0)*/}
              {blogs
                .filter((blog) => blog.blogId < 0)
                .map((blog) => (
                  <div
                    className="blog-items"
                    key={blog.blogId < 0 ? blog.blogId : NaN}
                  >
                    <Card
                      sx={{ marginBottom: 2 }}
                      key={blog.blogId}
                      onClick={() => {
                        setSelectedBlog({
                          contId: blog.blogId,
                          contTitle: blog.blogTitle,
                          contAuthor: blog.blogAuthor,
                          contContent: blog.blogContent,
                          contImg: blog.blogImg,
                        });
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={blog.blogImg ? blog.blogImg : logo}
                          alt="article image"
                        />
                        <StyledCardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {blog.blogTitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginTop: -1 }}
                          >
                            Written By {blog.blogAuthor}
                          </Typography>
                        </StyledCardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
          <BlogSubmissionForm />
        </>
      ) : (
        <>
          {isMobile ? <br /> : null}
          {/* ||| INNER CLUB ALBUM REVIEWS / CLUB EMAILS COMPONENT ||| */}
          {/* When you click into a review or email, it gets the content from the database */}
          <div className="blog-cont2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* TODO: The arrow needs better formatting for mobile */}
              {/* TODO: When in an article and you click the BLOG tab, it doesn't exit. It only exits when you click the back button */}
              <IconButton
                onClick={() => {
                  setSelectedBlog(null);
                }}
                style={{ position: "absolute", left: 0 }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <h1 style={{ textAlign: "center" }}>{selectedBlog?.contTitle}</h1>
            </div>

            <br />
            <h2>
              {selectedBlog.contId >= 0 ? (
                <div style={{ fontWeight: "normal", fontSize: 20 }}>
                  {selectedBlog?.contContent}
                </div>
              ) : (
                <>
                  <div
                    style={{ fontWeight: "normal", fontSize: 17 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedBlog.contContent,
                    }}
                  ></div>
                </>
              )}
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
