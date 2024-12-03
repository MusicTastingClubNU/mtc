import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../../imgs/MTC_logo.png";
import data from "./blogData.json";
import "./blog.css";
import { useMediaQuery } from "@mui/material";
import BlackButton from "../../BlackButton1";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Chip from "@mui/material/Chip";
// import EmailContent from "./EmailTest";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <React.Fragment>
      <TitleAndDirectory />
      {selectedBlog == null ? (
        <React.Fragment>
          {isMobile ? <br></br> : null}
          <div className="blog-cont2">
            <h2 className="blog-titles">Club Articles</h2>
            <div className="blog-items-cont">
              {blogs.map((blog) => (
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

                      {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexWrap: "wrap", 
                          gap: "8px", 
                        }}
                      >
                        <Chip
                          label="Short Review"
                          size="small"
                          sx={{
                            marginTop: -2,
                            backgroundColor: "lightgreen",
                            marginLeft: 2,
                            marginBottom: 2,
                          }}
                        ></Chip>
                        <Chip
                          label="Hip Hop"
                          size="small"
                          sx={{
                            marginTop: -2,

                            backgroundColor: "lightgreen",
                          }}
                        ></Chip>
                      </div> */}
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
              <h1 style={{ textAlign: "center" }}>{selectedBlog?.contTitle}</h1>
            </div>
            {/* ||||||| <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                // margin: "10px 10px",
              }}
            >
              <Chip
                label="Short Review"
                size="small"
                sx={{
                  marginTop: -1,
                  backgroundColor: "lightgreen",
                  marginRight: 1,
                }}
              ></Chip>
              <Chip
                label="Hip Hop"
                size="small"
                sx={{
                  marginTop: -1,
                  backgroundColor: "lightgreen",
                }}
              ></Chip>
            </div>  |||||||| */}
            <br />
            <h2>{selectedBlog?.contContent}</h2>
            {/* "blogContent": "<p>If you’re a fan of <b>Wu-Tang</b>, <i>Nas</i>, or <u>MF DOOM</u>, Joey Bada$$’s <em>'1999'</em> is an album you should listen to.</p><p>It’s a great <span style='color:blue;'>90s New York Hip Hop</span> album with accessible beats and slick flows for an overall enjoyable listen. As a 21-year-old New Yorker, it somehow makes me nostalgic for a time I wasn’t even around for.</p><ul><li><b>World Domination</b></li><li><i>Pennyroyal</i></li><li><u>Righteous Minds</u></li></ul>" */}

            {/* <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: selectedBlog?.contContent }}
            ></div> */}

            {/* <EmailContent /> */}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Blog;
