import React, { useEffect, useState } from "react";
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
import WNUR from "./WNUR";

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
            <div className="blog-items-cont3">
              {/* The club emails have IDs that are smaller than 0 (the reason for
                 .filter((blog) => blog.blogId < 0)*/}
              {blogs
                .filter((blog) => blog.blogId >= 0)
                .map((blog) => (
                  <div
                    className="blog-items3"
                    key={blog.blogId < 0 ? blog.blogId : NaN}
                  >
                    <Card
                      sx={{
                        marginBottom: 1,
                      }}
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
                        <div className="blog-items3">
                          <img
                            src={blog.blogImg ? blog.blogImg : logo}
                            alt="Blog"
                          />
                          <div className="text-content">
                            <h4 style={{ marginBottom: 3 }}>
                              {blog.blogTitle}
                            </h4>
                            <h6>Written By {blog.blogAuthor}</h6>
                          </div>
                        </div>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
          {/*||| CLUB EMAILS COMPONENT ||| */}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Emails</h2>
            <div className="blog-items-cont2">
              {/* The club emails have IDs that are smaller than 0 (the reason for
                 .filter((blog) => blog.blogId < 0)*/}
              {blogs
                .filter((blog) => blog.blogId < 0)
                .map((blog) => (
                  <div
                    className="blog-items2"
                    key={blog.blogId < 0 ? blog.blogId : NaN}
                  >
                    <Card
                      sx={{
                        marginBottom: 1,
                      }}
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
                        <div className="blog-items2">
                          <img
                            src={blog.blogImg ? blog.blogImg : logo}
                            alt="Blog"
                          />
                          <div className="text-content">
                            <h3>{blog.blogTitle}</h3>
                            <h5>Written By {blog.blogAuthor}</h5>
                          </div>
                        </div>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
          <WNUR />
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
              <div style={{ textAlign: "center" }}>
                <h1>{selectedBlog?.contTitle}</h1>
                <h3 style={{ marginBottom: -10 }}>
                  Written By {selectedBlog?.contAuthor}
                </h3>
              </div>
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
