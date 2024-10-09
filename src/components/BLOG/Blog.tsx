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

interface Props {}

// const StyledCardContent = styled(CardContent)({
//   display: "-webkit-box",
//   WebkitBoxOrient: "vertical",
//   WebkitLineClamp: 4,
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   maxHeight: "9em",
// });

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "auto",
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

  const week1 =
    "What time is it? \n  \
    It's time to move those chains!! It's time for the MTC week 2 update!!\n \
    Hope everyone's getting back in the swing of the quarter, and here are some awesome music recommendations to be your soundtrack for week 3 of fall quarter! ( 😓 <-- how I feel about it already being week 3)\nAlbum of the week: 'Paradigmes' by La Femme (picked by me 😄!) \
    Runner up album of the week: 'The Well I Fell Into' by WHY? (picked by Simon) \
    Song of the week: 'De Selby (parts 1 and 2)' by Hozier (picked by Aidan) \
    Runner up song of the week: 'Something Holy - Live at Funkhaus, 2019' by Alice Phoebe Lou (picked by Joseph) \
    For your listening convenience, all the picks are collected in this spotify playlist (shout out DJ Reed). \
    Last week on Music Tasting Club... \
    we had a distinct schism between our album picks and our song picks-- \
    album choosers Susanna and Danny opted for more ambient', 'vibes based' music, while song pickers AJ and Ryan went a higher energy route for songs that members said were 'hype' and 'go hard'. \
    Susanna's album, Mood Valiant by Hiatus Kaiyote, is a neosoul/alt R&B album featuring rich vocals wrapped in both string instruments and electronic elements, aspects which members particularly enjoyed. \
    Danny's album, Lamp Genso by Lamp, is a Japanese soft pop album with songs that blend into each other, creating an overall effect of calm and relaxation. Members specifically commented on the lack of distinction between songs. In part this was because none of us could understand the words. \
    AJ's song, BagBak by Vince Staples, is a hip hop song with a strong electronic beat and witty lyrics. Members felt a strong desire to hit the gym when this song came on. \
    Ryan's song, hydrocodone by black kray, is a rage song which 'demands subwoofers'. Overlapping elements and heavy bass make this song work best at full volume. \
    Also, Espresso by Sabrina Carpenter was voted ~song of the summer~ in a close bracket final up against Not Like Us by Kendrick Lamar. Shout out Simon for organizing the bracket. \
    Hope to see you in at 5pm in Kresge 2420 on Thursday 10/10 ready for discussion of this weeks picks!";

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
            {/* <div
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
            </div> */}
            <br />
            <h2>{selectedBlog?.contContent}</h2>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Blog;
