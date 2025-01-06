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
import ClubPlaylists from "./ClubPlaylists";
import StarterPacks from "./StarterPacks";
// import { Star } from "@mui/icons-material";
import TabsList from "./MTCAotY";

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
          {/* ||| CLUB PLAYLISTS COMPONENT ||| */}
          <ClubPlaylists />
          {/* ||| STARTER PACKS COMPONENT ||| */}
          <StarterPacks />
          {/* ||| MTC Album Of The Year ||| */}
          {/* <MTCAotY year={2024} /> */}
          <TabsList />
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

/* ||||||| <div
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
</div>  |||||||| */

/* <>
<h1>WEEK 9</h1>

<h1>WEEK 8</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div><div>Happy last full week until Thanksgiving break!</div><div><br></div><div>First, a couple notes about our picks this week:&nbsp;</div><div>1) It's finally time for Mr President&nbsp;🫡&nbsp;(Archie) to suggest Album of the Week! The pressure is on, Archie, it better be good.&nbsp;</div><div>&nbsp; &nbsp; &nbsp; 1a. Archie also has runner-up song of the week, so that also better be good,</div><div>2) This week, after our discussion, we'll be watching <b style="color:rgb(255,153,0)">Piece by Piece</b><font color="#000000">, a film about the life of songwriter and Northwestern alum, Pharrell Williams (it's also a Lego animation). As such, </font><b><font color="#000000">our </font><font color="#0000ff">meeting location has changed</font><font color="#000000"> to&nbsp;</font></b><font color="#0000ff" style="font-weight:bold">KRESGE 1515</font><font color="#000000">.</font><font color="#0000ff" style="font-weight:bold">&nbsp;</font><span style="color:rgb(0,0,0)">This will also become relevant when I get to our </span><b style="color:rgb(0,0,0)">*optional*</b><span style="color:rgb(0,0,0)"> runner-up album.&nbsp;</span></div><div><br></div><div><b>Album of the week:&nbsp;</b>“Alfredo” by Freddie Gibbs and The Alchemist (picked by Mr President 🫡)</div><div><b><font color="#ff0000">Optional&nbsp;</font>Runner-up album of the week:&nbsp;</b>“Piece By Piece - Music from the Motion Picture”&nbsp;by Pharrell Williams (<font color="#ff0000">POTENTIAL MOVIE SPOILERS</font>) (also picked by Mr President&nbsp;🫡)</div><div><b>Song of the week:&nbsp;</b>“I Could Never Take The Place Of Your Man” by Prince (picked by Grace)</div><div><b>Runner-up song of the week:&nbsp;</b>“The Weight” by The Band (also picked by Mr President&nbsp;🫡)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/6FqNsge4athUOs89kmrY08?si=Aq7Pc2wHSK6vwpjkao5GwQ&amp;pi=u-zStzoyr2Q720__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPmA48I2Qw$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/6FqNsge4athUOs89kmrY08?si%3DAq7Pc2wHSK6vwpjkao5GwQ%26pi%3Du-zStzoyr2Q720__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPmA48I2Qw$&amp;source=gmail&amp;ust=1733515992537000&amp;usg=AOvVaw3dfZDr6cgZQ_etWqCs-5YS">this Spotify playlist.</a></div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>Joseph's album, <b><i>Hiding Places by Billy Woods and Kenny Segal</i></b>&nbsp;is a hip-hop album that superficially highlights Woods' unique rap style. Woods sings mostly in a monotone, but his words are full of meaning and imagery. Woods ruminates on stress and hopelessness and the state of the world over gloomy, minimalist beats. The cadence is reminiscent of slam poetry as it trudges through the quicksand backing,&nbsp;creating a feeling of grogginess and exhaustion that&nbsp;complements Woods' own.&nbsp;&nbsp;</div><div><br></div><div>Daniel's album,&nbsp;<b style="font-style:italic">Spirit Phone</b><i>&nbsp;</i><b style="font-style:italic">by Lemon Demon </b>is an indie synth-pop album. Lemon Demon, also known as Neil Cicierega, has been creating things on the internet for over 20 years, including <a href="https://urldefense.com/v3/__https://www.youtube.com/watch?v=Tx1XIm6q4r4&amp;ab_channel=NeilCicierega__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPm47dnRWg$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://www.youtube.com/watch?v%3DTx1XIm6q4r4%26ab_channel%3DNeilCicierega__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPm47dnRWg$&amp;source=gmail&amp;ust=1733515992537000&amp;usg=AOvVaw1eL0QSIwssPlbJEhJUhTt5">Potter Pupper&nbsp;Pals</a>.&nbsp;At a young age, his parents noticed his creativity and interest in electronic music and pulled him out of school so he could pursue his passions. <b>Spirit Phone</b>, though, is one of his more serious projects. Dark but light hearted, this album tells "monster of the week" horror stories. The album pulls from rock, punk, and indie pop, even ironically sampling Michael Jackson ("<span style="font-family:&quot;Helvetica Neue&quot;;font-size:13px">I do not endorse the occult").&nbsp;</span>&nbsp;</div><div><br></div><div>Andrew's song, <b><i>Postcards from Italy by Beirut</i></b>, is a relaxing song with a timeless feel. Brassy melodies combined with reminiscent lyrics give this song a nostalgic mood that will take you back to summer nights, road trips, and times with friends. This song feels like it belongs in an indie movie like Little Miss Sunshine.</div><div><br></div><div>Susanna's song, <b><i>Nothing's Free by Angel Olsen</i></b>, is an indie vocal jazz song. Olsen's beautifully pure vocals shine on this track, as does an epic sax solo. This song feels like drinking alone in a bar and giving up on a relationship or a certain phase in one's life. Yet another song that works well in November.</div><div><br></div><div>Once again,</div><div><br></div><div>See you at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 1515&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 11/21</b>&nbsp;ready for discussion and for <font color="#0000ff"><b>Piece by Piece</b></font>!</div><font color="#888888"><div><br></div></font></div><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPm7YAhy9A$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!UCT4s29EZ9FE3RLc751GljVciEqH7DHR2Mqrq-8ReczkBmBZ9uPDxLTioNP8U6djMn5sWjZ-poG_8WsbrhO9jXJ58qjxwddgSYxVcARvkSAyfTPm7YAhy9A$&amp;source=gmail&amp;ust=1733515992537000&amp;usg=AOvVaw3fCbMoDtuL9UmuwD4p6paX">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 7</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div>Happy Monday!</div><div>Apologies for the late email, it's a busy week&nbsp;😅. Everyone make sure to take care of yourselves, get plenty of sleep, etc.</div><div><br></div><div>This week's recs!:&nbsp;</div><div><b>Album of the week:&nbsp;</b>“Hiding Places” by&nbsp;Billy Woods and Kenny Segal (picked by Joseph)<br></div><div><b>Runner-up album of the week:&nbsp;</b>“Spirit Phone” by Lemon Demon (Not the bonuses) (picked by Daniel)</div><div><b>Song of the week:&nbsp;</b>“Postcards from Italy” by Beirut (picked by Andrew)</div><div><b>Runner-up song of the week:&nbsp;</b>“Nothing’s Free” by Angel Olsen (picked by Susanna)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/3XsBVHnq71wAPM24W9zlgh?si=Q8DCof2vTnSnIOfF7ip88g__;!!Dq0X2DkFhyF93HkjWTBQKhk!X4iUg9YNsu60ii9Th4JxtJ7UdSx9p-2M48DfF-GAAzUF0vDM34ey7VjJGuHcuD9Nt4aTV0SIvDXJAuWwNpSQTajw_IVKSwh4GTcmCLudHlzRAXjkSTXqST0$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/3XsBVHnq71wAPM24W9zlgh?si%3DQ8DCof2vTnSnIOfF7ip88g__;!!Dq0X2DkFhyF93HkjWTBQKhk!X4iUg9YNsu60ii9Th4JxtJ7UdSx9p-2M48DfF-GAAzUF0vDM34ey7VjJGuHcuD9Nt4aTV0SIvDXJAuWwNpSQTajw_IVKSwh4GTcmCLudHlzRAXjkSTXqST0$&amp;source=gmail&amp;ust=1733515992543000&amp;usg=AOvVaw2DJk39hdFlcBlkLhamrKUD">this Spotify playlist.</a></div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>Cai's album,&nbsp;<b><i>And in the Darkness, Hearts Aglow by Weyes Blood</i></b>, is the second in a trilogy of albums. The first in the trilogy centers around the theme of impending doom, so And in the Darkness, Hearts Aglow, naturally, is about feeling around in the darkness for meaning, specifically in a period of instability and change (topical, no?). Stylistically, this album is similar to Lana del Rey, "but with actual energy". Perfect for seasonal depression, this album captures emotions with "whatever words capture them". Standout tracks include <b>H</b><b style="font-family:&quot;Helvetica Neue&quot;;font-size:13px">earts Aglow </b><span style="font-family:&quot;Helvetica Neue&quot;;font-size:13px">and <b>God Turn Me Into a Flower</b>.&nbsp;</span></div><div><br></div><div>AJ's album,&nbsp;<i style="font-weight:bold">Stankonia by OutKast</i>, is a chaotic, adventurous, funny album. Though it is a hip-hop album, it's obvious that OutKast didn't listen to hip-hop while recording Stankonia. Instead, the duo listened to mostly Chuck Berry, Jimi Hendrix, and Prince, and the rock influence shows, in the best way. The album also draws from electronic, funk, and more,&nbsp;overall giving the album an "otherworldly" quality. The storytelling throughout the album also stands out,&nbsp;particularly on <b>Question Mark</b>&nbsp;and <b>Toilet Tissue</b>. Classics like <b>Ms Jackson</b>&nbsp;and <b>So Far, So Clean </b>also come from Stankonia.&nbsp;</div><div><br></div><div>Daniel's song, <b><i>How to Disappear Completely&nbsp;by Radiohead</i></b>, is, like <i>And in the Darkness, Hearts Aglow</i>, perfect for seasonal&nbsp;depression. If you're looking to cry in the dark on the floor, this might just be your new soundtrack. In the song, Thom Yorke sings about dissociation, depression, and being completely overwhelmed and overstressed. The song begins with a single dissonant tone, and over time builds into a a&nbsp;powerfully pleading climax of strings,&nbsp;vocals, and electronic elements all&nbsp;combined.&nbsp;</div><div><br></div><div>My song,&nbsp;<i style="font-weight:bold">I Sat by the Ocean by Queens of the Stone Age</i>, takes lyrics about a tough breakup and lays them over grooving bass and guitar riffs to make a good, simple rock song. Clean guitar slides support the singer's falsetto as he laments what he has lost, producing a satisfying, easy to listen to track with just the right amount of substance.</div><div><br></div><div>Lastly, if you're looking to support some local Northwestern student bands, or see some cheap live music, check out <font color="#0000ff" style="font-weight:bold">Silver Ring </font><font color="#000000">and </font><font color="#0000ff" style="font-weight:bold">Static Transmission </font><font color="#000000">at <b>9:15pm</b> this <b>Friday</b>&nbsp;<b>11/15</b>&nbsp;at <b>2019 Ridge Avenue </b>(They're really good!)</font></div><div><br></div><div>Once again,</div><div><br></div><div>See you at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 2420&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 11/14</b>&nbsp;ready for discussion!</div><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!X4iUg9YNsu60ii9Th4JxtJ7UdSx9p-2M48DfF-GAAzUF0vDM34ey7VjJGuHcuD9Nt4aTV0SIvDXJAuWwNpSQTajw_IVKSwh4GTcmCLudHlzRAXjkbpfxb-U$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!X4iUg9YNsu60ii9Th4JxtJ7UdSx9p-2M48DfF-GAAzUF0vDM34ey7VjJGuHcuD9Nt4aTV0SIvDXJAuWwNpSQTajw_IVKSwh4GTcmCLudHlzRAXjkbpfxb-U$&amp;source=gmail&amp;ust=1733515992543000&amp;usg=AOvVaw2za3MwtAkEAIyRudtn2O5q">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 6</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div><div>Happy November!</div><div><br></div></div><div>Hope everyone had&nbsp;a fun and safe Halloweekend! To all those eligible, make sure to vote if you haven't already!!</div><div><br></div><div>Recs:</div><div><b>Album of the week:&nbsp;</b>“And in the Darkness, Hearts Aglow” by&nbsp;Weyes Blood (picked by Cai)<br></div><div><b>Runner-up album of the week:&nbsp;</b>“Stankonia” by OutKast (picked by AJ)</div><div><b>Song of the week:&nbsp;</b>“How to Disappear Completely” by Radiohead (picked by Danny)</div><div><b>Runner-up song of the week:&nbsp;</b>“I Sat by The Ocean” by Queens of the Stone Age (picked by Me!)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/1zmfD5hPkddMHUmNlPURJQ?si=e2189d0e20144348__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtNojbiQdI$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/1zmfD5hPkddMHUmNlPURJQ?si%3De2189d0e20144348__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtNojbiQdI$&amp;source=gmail&amp;ust=1733515992548000&amp;usg=AOvVaw3m0kyJ-bqvoi_f6mvdjoT8">this Spotify playlist</a>.</div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>Ryan's album, <b><i>Since I Left You [Disc 1] by The Avalanches</i></b>, is a musical collage: the band's debut album is made entirely of samples. Though every sample (of which there are over 3500) is, by definition, unoriginal, the result is something truly unique. Repeating vocal soundbites&nbsp;layer over funky basslines in songs like Live at Dominoes, or over whimsical keyboards in songs like Two Hearts in 3/4 Time (which we determined was not, in fact in&nbsp;3/4 time, and was instead in 6/8). We also watched the music video for <a href="https://urldefense.com/v3/__https://www.youtube.com/watch?v=qLrnkK2YEcE__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtNFVO1L8A$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://www.youtube.com/watch?v%3DqLrnkK2YEcE__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtNFVO1L8A$&amp;source=gmail&amp;ust=1733515992548000&amp;usg=AOvVaw2lEjQsEjiJJxxOg5cpxqyl">Frontier Psychiatrist</a>, which is also something of a collage of visual elements.</div><div><br></div><div>Andrew's album, <b><i>New Levels New Devils&nbsp;by Polyphia</i></b>, is 36 minutes and 57 seconds of insane guitar shredding. While this can make the band somewhat polarizing, the club had a generally positive reaction to New Levels New Devils. <b>So Strange</b>&nbsp;stands out from the other tracks as the only one with vocals, which also proved polarizing: while Andrew thought the outsourced vocals detracted from the "virtuoso" level instrumentation, Simon thought the vocals felt like the necessary result of an instrumental buildup. Some instrumentalists enjoyed the extended "flex", others (me) found the perpetual shredding a little immature and musically unearned. Regardless, <span class="il">members</span> thought it was an enjoyable listen.&nbsp;</div><div><br></div><div>Reed's song,&nbsp;<b><i>Boys At School by SPELLLING</i></b>, is an art-pop song about struggling to fit in with peers in childhood. Echoing and emotion-filled vocals sit atop melancholy synths and guitar melodies. Despite its 7-minute length and&nbsp;slightly repetitive, this song never drags. It continually rises and falls. <span class="il">Members</span> thought the lyrics were juvenile but reminiscent, and drew comparisons to Prince and other 80s progressive music.&nbsp;</div><div><br></div><div>Simon's song, <i style="font-weight:bold">More Than It Hurts You by The Front Bottoms</i>, is the song to put on if you've been angsting out and staring at yourself in the mirror a little too much. The lyrics are, similarly to Boys at School, juvenile in a reminiscent way. Like most midwest emo bands, The Front Bottoms "can't sing and can't play their guitars", but this all adds to the raw and honest lyricism. Shout out Simon for the soundtrack to my future breakdowns.&nbsp;</div><div><br></div><div>Once again,</div><div><br></div><div>See you at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 2420&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 11/7</b>&nbsp;ready for discussion!</div><font color="#888888"><br></font><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtN5tPRSEk$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!VwMY6ueHndg1Du2bUSfubPrJEH4S-O-yuWG4b1qNj2YZ9o_4fpO0lml56us04dsrU7ZBqSvZLcjIfarQOLmsY5-BXiwB8pes-nkD8CJDFlC6qUtN5tPRSEk$&amp;source=gmail&amp;ust=1733515992548000&amp;usg=AOvVaw1rUXWucT-5apYKnGmXcaLF">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 5</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div><div>Happy Halloweek!&nbsp;🎃></div><div><br></div></div><div>Hope everyone had&nbsp;a good weekend, whether that&nbsp;be dressing up and celebrating Halloweekend #1, resting and recharging post-midterms, or at least taking a break before locking back in for more midterms&nbsp;😓.</div><div><br></div><div>This week, we'd love to see you <font color="#ff9900"><b>in costume</b>&nbsp;</font><font color="#000000">for our meeting!!</font></div><div><br></div><div>Anyway, onto the recs!&nbsp;</div><div><b>Album of the week:&nbsp;</b>“Since I Left You [Disc 1]” by The Avalanches (picked by Ryan)<br></div><div><b>Runner-up album of the week:&nbsp;</b>“New Levels New Devils” by Polyphia&nbsp;(picked by Andrew)</div><div><b>Song of the week:&nbsp;</b>“Boys At School” by Spellling (picked by Daniel)</div><div><b>Runner-up song of the week:&nbsp;</b>“More Than It Hurts You” by The Front Bottoms (picked by Simon)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/714eycyHXrAmpu94l0YhWl__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiAjpeL1w$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/714eycyHXrAmpu94l0YhWl__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiAjpeL1w$&amp;source=gmail&amp;ust=1733515992697000&amp;usg=AOvVaw1VQXH_morJJtOUP9YEFeTV">this Spotify playlist</a>.</div><div><br></div><div>Although our picks are not Halloween-themed, we do have a <a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/0FG1vEcSVnAyZAa0r0Ekko?si=899c3fa18dee4cfb&amp;pt=abfc3d5bff279710f4acd79d57701908__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiNeSgcDA$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/0FG1vEcSVnAyZAa0r0Ekko?si%3D899c3fa18dee4cfb%26pt%3Dabfc3d5bff279710f4acd79d57701908__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiNeSgcDA$&amp;source=gmail&amp;ust=1733515992697000&amp;usg=AOvVaw0gCGUYMlQjdOUZ69QXLV9K">collaborative playlist of Halloween music</a> that you should join and add music too!</div><div><br></div><div>Also join our <a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/6mVWrSedGQt1p8Cs8CPM3q?si=3391fedcb15c478e&amp;pt=01aaf8f35938b2084a01650ce3af3169__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiBwhPDq4$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/6mVWrSedGQt1p8Cs8CPM3q?si%3D3391fedcb15c478e%26pt%3D01aaf8f35938b2084a01650ce3af3169__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiBwhPDq4$&amp;source=gmail&amp;ust=1733515992697000&amp;usg=AOvVaw29-FLC1E0vFhWfglrqOur3">hip-hop workout music</a> playlist!</div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>Acton's album, <b><i>Larks' Tongues In Aspic</i></b><i><b>&nbsp;by King Crimson</b></i>, is an eclectic prog rock album from 1973. It begins with a 2-minute kalimba solo which then fades into a staccato violin section, before dropping into a heavy electric guitar riff. According to Acton, the ideal environment for listening to this album (and all music) is in a closet in the dark. King Crimson weaves contrasting elements together to create what is best described as a soundscape. Favorite elements included the arpeggiation throughout the album, the vocals on Book of Saturday, and the eerie strings.&nbsp;</div><div><br></div><div>Aidan's album, <b><i>Hadestown (Original Broadway Cast Recording) [2019]” by Original Broadway Cast of Hadestown</i></b>, is, obviously, the soundtrack to the award-winning Broadway show <i>Hadestown</i>. The show is a retelling of the Greek myth of Orpheus and Eurydice. Set in a Depression-era-esque world, Hades is portrayed, not exactly as Satan, as he often is in Greek myth, but as (in Aidan's words) the next closest thing: a capitalist tycoon. While <span class="il">members</span> enjoyed the bluesy, New Orleans-style of music, Orpheus' character evoked an extreme reaction of annoyance from some <span class="il">members</span>.&nbsp;</div><div><br></div><div>Reed's song,&nbsp;<b><i>Overthrown by Thee Oh Sees</i></b>, is a hard rock song that helped Reed channel his emotions last week. Screamy vocals, heavy guitar riffs, and extremely angsty lyrics might be just what you're looking for if you find yourself asking "what is the point of it all?". We also watched <a href="https://urldefense.com/v3/__https://www.youtube.com/watch?v=j5q_bF2Te04__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOioTGjjpw$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://www.youtube.com/watch?v%3Dj5q_bF2Te04__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOioTGjjpw$&amp;source=gmail&amp;ust=1733515992697000&amp;usg=AOvVaw0s448nba_D_HTeMdos0RI4">the music video</a>. If "seizure-inducing claymation" sounds up your alley, I'd give it a watch.&nbsp;</div><div><br></div><div>Nisha didn't make it on Thursday, so we didn't end up discussing&nbsp;<i style="font-weight:bold">Waltz #2 (XO) by Elliott Smith</i>, but it's a great song, and a long-time favorite of mine, so luckily I can try to fill in the gaps&nbsp;😄! Waltz #2 (XO), as its name suggests, is a waltzing lament of the singer's family relationships. Smith's melancholy piano and guitar melodies support his raw lyrics that describe an experience at a karaoke bar with his mother and step-father.&nbsp;</div><div><br></div><div><br></div><div>Once again,</div><div><br></div><div>Hope to see you (<b><font color="#ff9900">In costume!!</font><font color="#000000">)</font></b>&nbsp;at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 2420&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 10/31</b>&nbsp;ready for discussion!</div><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiAvPlJZc$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!RNwlzeR3GKVhjhihvNi77Gxd8Osz6btwmJR6Rt9a3ACyDwnO8dS08Wjpt-4H3eKmNl5PQeEPjd1MCPUR7Ac_3wrcVZcSAzca1QMUXUbjl1m_qiOiAvPlJZc$&amp;source=gmail&amp;ust=1733515992697000&amp;usg=AOvVaw2sv0_nSakIUV4f2d-zDc-M">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 4</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div><div>Hope everyone's been enjoying the beautiful weather this weekend! This is also your reminder that there are only 11 days until Halloween, so I hope you've all got your costumes locked down.&nbsp;</div><div><br></div><div>Anyway, onto the <span class="il">MTC</span> week 4 update!<br></div><div><br></div></div><div>You know the drill...</div><div><b>Album of the week: </b>"Larks' Tongues In Aspic" by King Crimson (picked by Acton)<br></div><div><b>Runner-up album of the week:&nbsp;</b>“Hadestown (Original Broadway Cast Recording) [2019]” by Original Broadway Cast of Hadestown (picked by Aidan)</div><div><b>Song of the week:&nbsp;</b>“Overthrown” by Thee Oh Sees (picked by Reed)</div><div><b>Runner-up song of the week:&nbsp;</b>“Waltz #2 (XO)” by Elliott Smith (picked by Nisha)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/51XLjVbYvDmchvLuvh9aPv?si=pDwEdSwYRiifwPZAXP4djA__;!!Dq0X2DkFhyF93HkjWTBQKhk!TK66kpnW03KzLmDYeQmqyT7SNYH3mb-6sHAtWkfCYoFLT3wDyshWvFrZAF7yrw8rYKmpGN83ullqV8w3oyQPWcARCcszod7RD2oCh19X4jINaIYbPOXxiro$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/51XLjVbYvDmchvLuvh9aPv?si%3DpDwEdSwYRiifwPZAXP4djA__;!!Dq0X2DkFhyF93HkjWTBQKhk!TK66kpnW03KzLmDYeQmqyT7SNYH3mb-6sHAtWkfCYoFLT3wDyshWvFrZAF7yrw8rYKmpGN83ullqV8w3oyQPWcARCcszod7RD2oCh19X4jINaIYbPOXxiro$&amp;source=gmail&amp;ust=1733515993513000&amp;usg=AOvVaw18cB9l1hHnJtmv811TccLQ">this Spotify playlist</a>.</div><div><br></div><div>We also have a <b>rule change</b>&nbsp;for picks. In addition to limiting song length to 20 minutes, <b>albums will be limited to 2 hours</b>&nbsp;in the future. Always feel free to shout out longer albums weekly shoutouts in meetings, but we encourage you to go for slightly shorter albums for discussion to make sure everyone can listen to all the music. This will apply starting with <i>next week's</i>&nbsp;picks (so Aidan we'll let it slide 😉).</div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>Reed's album,&nbsp;<i><b>And Then Nothing Turned Itself Inside Out by Yo La Tengo</b></i>, is an album that "deserves your <i>divided</i> attention". With songs pulling elements from dream pop, shoegaze, post-rock, soft rock, and more, this album is "pleasant" and "dreamlike". It combines psychedelic harpsichord with drum machine beats to create a calming background soundtrack to your life. Favorite songs included Let's Save Tony Orlando's House, Cherry Chapstick, and Our Way to Fall.&nbsp;</div><div><br></div><div>Grace's album, <b><i>Ill Communication by The Beastie Boys</i></b>, is a light-hearted romp through hip-hop, rap, and punk. Sometimes boys just wanna have fun, too. Some <span class="il">members</span> found the shouty vocals and overall rough production style to be a little grating after a while, but standout tracks included Get It Together (with a great feature from Q-Tip), Sabrosa, Futterman's Rule, and of course, the single, Sabotage.&nbsp;</div><div><br></div><div>Cai's song, <b><i>Starburned and Unkissed by Caroline Polachek</i></b>, comes from the soundtrack of the movie I Saw the TV Glow. In theme with the movie, this song explores a longing for a version of yourself that you wish existed, or that no longer exists. Its production, by AG Cook (who, among other things, worked with Charli XCX on Brat), heavily uses autotune and distortion to enhance Polachek's vocals as the song moves through each emotional rise and fall.&nbsp; &nbsp;</div><div><br></div><div>Zoey's song,&nbsp;<b><i>Romantic by Mannequin Pussy</i></b><i>, </i>is, in contrast to what one might expect based on its title and cover art, an angsty and angry, song, perfect for the approaching early sunsets and freezing weather. This song also comes off of a short, 17-minute album of the same name, so if you liked Romantic and you have a spare 20 minutes (17 for listening and 3 for going through it emotionally post-listen), give it a listen. Or, if you only listen to one other song off Romantic (the album), Zoey recommends <b>Emotional High</b>.&nbsp;</div><div><br></div><div>Also,&nbsp;<font color="#0000ff"><b><span class="il">MTC</span> watched some music videos</b>, </font><font color="#000000">(we didn't get a lot of suggestions and Blurred Lines was vetoed so we watched Gangnam Style).&nbsp;</font></div><div><br></div><div>Once again,</div><div><br></div><div>Hope to see you at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 2420&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 10/24</b>&nbsp;ready for discussion!</div><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!TK66kpnW03KzLmDYeQmqyT7SNYH3mb-6sHAtWkfCYoFLT3wDyshWvFrZAF7yrw8rYKmpGN83ullqV8w3oyQPWcARCcszod7RD2oCh19X4jINaIYbfYGqrIA$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!TK66kpnW03KzLmDYeQmqyT7SNYH3mb-6sHAtWkfCYoFLT3wDyshWvFrZAF7yrw8rYKmpGN83ullqV8w3oyQPWcARCcszod7RD2oCh19X4jINaIYbfYGqrIA$&amp;source=gmail&amp;ust=1733515993513000&amp;usg=AOvVaw0gJqG0Pa5CzR2Qz92bZpwO">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 3</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div id=":v6" class="a3s aiL "><div dir="ltr"><div dir="ltr"><div><div>What's up music tasters,</div><div>Happy <span class="il">MTC</span> week 3 update!</div><div><br></div></div><div>Whether you have four midterms this week or none, hopefully, the&nbsp;picks can brighten up your life a little&nbsp;🌞.</div><div><br></div><div><b>Album of the week: "</b>And Then Nothing Turned Itself Inside-Out" by Yo La Tengo (picked by Reed)</div><div><b>Runner-up album of the week:&nbsp;</b>“Ill Communication” by The Beastie Boys (picked by Grace)</div><div><b>Song of the week:&nbsp;</b>“Starburned and Unkissed” by Caroline Polachek (picked by Cai)</div><div><b>Runner-up song of the week:&nbsp;</b>“Romantic” by Mannequin Pussy (picked by Zoey)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/080TN68vaY2TraGySsO5sB?si=q81qiIWVSveFNlt6vGEaiQ&amp;pi=u-HMjcXa-1S6qS__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMx8VJcgTs$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/080TN68vaY2TraGySsO5sB?si%3Dq81qiIWVSveFNlt6vGEaiQ%26pi%3Du-HMjcXa-1S6qS__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMx8VJcgTs$&amp;source=gmail&amp;ust=1733515993519000&amp;usg=AOvVaw2nv4ktdiNtWnFQ7xk7vaon">this spotify playlist</a>&nbsp;(Pretty sure it's the right one this time 😅).</div><div><br></div><div>We also have a sure-to-be super fun ~<b>activity</b>~ coming up this week in <span class="il">MTC</span>!&nbsp;</div><div>Are you more of a visual learner? Hate podcasts but love a talk show? Love music and love music videos even more? Then this week's meeting might be right up your alley! That's right -- it's a <font color="#000000">music video discussion</font>!<font color="#ff00ff"><b> In addition to this week's music discussion, we'll be watching and talking about some music videos</b></font>! Send your favorite/most iconic music videos in the&nbsp;<a href="https://urldefense.com/v3/__https://groupme.com/join_group/98384670/EHkMPGSy__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxLsowPQs$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://groupme.com/join_group/98384670/EHkMPGSy__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxLsowPQs$&amp;source=gmail&amp;ust=1733515993519000&amp;usg=AOvVaw2eecpy5DsLy1E1r_MvKHgb"><span class="il">MTC</span> GroupMe</a>&nbsp;(if you're not in it you should join it). and during our Thursday meeting, we'll watch and discuss.&nbsp;</div><div><br></div><div><b><font color="#9900ff">Last week</font></b>&nbsp;on Music Tasting Club...</div><div><br></div><div>My album,&nbsp;<i><b>Paradigmes by La Femme</b></i>, is a French experimental pop album with Western and electronic influences. It was described by <span class="il">members</span> as "alien sci-fi bar music", and reminiscent of Knights of Sidonia by Muse and the boomerang channel theme song. Its non-English lyrics gathered mixed reviews.&nbsp;</div><div><br></div><div>Simon's album,&nbsp;<i><b>The Well I Fell Into by WHY?</b></i>, is an indie rock album in which the singer processes a recent breakup. It's also topical for the Jewish high holidays (shana tovah and hope everyone who observes had an easy fast), featuring verbal references to rosh hashanah as well as instrumentals from a shofar! <span class="il">Members</span> particularly enjoyed songs like "Marigold" and "Versa Go!", but many took issue with the fifth track, "When We Do The Dance". Specifically, the lyric "I wanna bust in your great great grandmother's uterus" proved controversial. I thought it was a banger.&nbsp;</div><div><br></div><div>Aidan's song(s),&nbsp;<i><b>De Selby Pts 1 and 2 by Hozier</b></i>, could be classified as minor cheating of song of the week, but, for Hozier's layered vocals, expert lyricism, and darkly lilting instrumentals, exceptions can be made. Many club <span class="il">members</span> were previously familiar with either Hozier or De Selby but enjoyed the opportunity to relisten to it. Preferences were split between parts 1 and 2.&nbsp;</div><div><br></div><div>Joseph's song, <b>Something Holy - Live at Funkhaus, 2019 by Alice Phoebe Lou</b><i>,&nbsp;</i>is an indie pop song about female sexuality. Specifically, though, Joseph chose the live version, which highlights Lou's exceptional vocals -- Bjorklike and filled with emotion. It's hard to believe this song was recorded live. <span class="il">Members</span> thought the instrumentals did not fall short of the pole vault bar set by Lou's vocals though. A strong bassline and dreamy guitars completed this song.&nbsp;</div><div><br></div><div>Also, <font color="#0000ff"><b><span class="il">MTC</span> discovered Wordle-like music games</b>, </font><font color="#000000">like the <a href="https://urldefense.com/v3/__https://spotle.io/__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxwlz7DH0$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://spotle.io/__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxwlz7DH0$&amp;source=gmail&amp;ust=1733515993519000&amp;usg=AOvVaw3rXiIqtiena0c2blvfo7-J">spotle</a>&nbsp;(we hit a 1 for 3 out of the games we played&nbsp;😬) (we had fun and that's what matters).</font></div><div><br></div><div>That's all from me today!</div><div><br></div><div>Hope to see you at&nbsp;<b style="color:rgb(153,0,255)">5pm&nbsp;</b><font color="#000000">in</font><b style="color:rgb(153,0,255)">&nbsp;Kresge 2420&nbsp;</b><font color="#000000">on</font><b style="color:rgb(153,0,255)">&nbsp;Thursday 10/17</b>&nbsp;ready for discussion of this week's&nbsp;picks as well as your favorite music videos!</div><div><br></div><div><br></div></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><font face="arial, sans-serif"><span style="color:rgb(0,0,0)"><a href="https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxVHwQXC8$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__http://musictastingclub.com__;!!Dq0X2DkFhyF93HkjWTBQKhk!XW5vX7iWsEkOg9Tm2xxPTOpU92mPU_OGv6FqN9nmMuRKUGrspfYG9x1gZqcdFyZVgALNwIZj3L7IIhm95MFLRrsB2rIsNsmdSMOqHTjNMZIc0hMxVHwQXC8$&amp;source=gmail&amp;ust=1733515993519000&amp;usg=AOvVaw2EH4wt0on0BOUCY2URTsiv">musictastingclub.com</a></span></font></div><div><img width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" style="color:rgb(0,0,0)" class="CToWUd" data-bit="iit"></div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div></div>`,
}}
></div>
<h1>WEEK 2</h1>
<div
dangerouslySetInnerHTML={{
__html: `<div dir="ltr"><div><div>What time is it? <strike>It's time to move those chains!!</strike> It's time for the <span class="il">MTC</span> week 2 update!!</div><div><br></div></div><div>Hope everyone's getting back in the swing of the quarter, and here are some awesome music recommendations to be your soundtrack for week 3&nbsp;of fall quarter!</div><div>(😓&nbsp;&lt;-- how I feel about it already being week 3)<br></div><div><br></div><div><b>Album of the week: "</b>Paradigmes" by La Femme (picked by me 😄!)<br></div><div><b>Runner up album of the week:&nbsp;</b>“The Well I Fell Into” by WHY? (picked by Simon)</div><div><b>Song of the week:&nbsp;</b>“De Selby (parts 1 and 2)” by Hozier (picked by Aidan)</div><div><b>Runner up song of the week:&nbsp;</b>“Something Holy - Live at Funkhaus, 2019” by Alice Phoebe Lou (picked by Joseph)</div><div><br></div><div>For your listening convenience, all the picks are collected in&nbsp;<a href="https://urldefense.com/v3/__https://open.spotify.com/playlist/4xxtF1pe4kUYt5YIfmhNvD?si=xZ5tnWL7TeyszC_ud-g5AA&nd=1&dlsi=c1ed60e6d18c483e__;!!Dq0X2DkFhyF93HkjWTBQKhk!QA37kyzG7L9A99h0V0tIws9oc5M7jqkxj9fFmLIjnQZVypowOALSrlu2AK7LOFhMLpYk1bD3aMifHP7nJGJmUYrd97u_vyxIVuUmu7BG4Z5vWr8RBH19KQ$" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://urldefense.com/v3/__https://open.spotify.com/playlist/5rp1HZtC81WPIwjobIMnOT?si%3DPT1SZewkT1ioWzAkB3AlTw__;!!Dq0X2DkFhyF93HkjWTBQKhk!Sju-BWV1wylWwLaQEIlVmtP1MmQ0nA2bQnbNpms6FzL5khia_SIi031E8ntez83QNAXBtuPwfobggg7ZF26EyznblV1jwQ1ee1OBOHTncFUoXbuK0PCOLw$&amp;source=gmail&amp;ust=1733515993744000&amp;usg=AOvVaw0aVEKa5NZ6lZxKg8tubQsu">this spotify playlist</a>&nbsp;(shout out DJ Reed).</div><div><br></div><div><b><font color="#9900ff">Last week</font></b> on Music Tasting Club...</div><div>we had a distinct&nbsp;schism between our album picks and our song picks--</div><div>album choosers Susanna and Danny opted for more "ambient", "vibes based" music, while song pickers AJ and Ryan went a higher energy route for songs that <span class="il">members</span> said were "hype" and "go hard".&nbsp;</div><div><br></div><div>Susanna's album, <i><b>Mood Valiant by Hiatus Kaiyote</b></i>, is a neosoul/alt R&amp;B album featuring rich vocals wrapped in both string instruments and electronic elements, aspects which <span class="il">members</span> particularly enjoyed.</div><div><br></div><div>Danny's album, <i><b>Lamp Genso by Lamp</b></i>, is a Japanese soft pop album with songs that blend into each other, creating an overall effect of calm and relaxation. <span class="il">Members</span> specifically commented on the lack of distinction between songs. In part this was because none&nbsp;of us could understand the words.&nbsp;</div><div><br></div><div>AJ's song, <i><b>BagBak by Vince Staples</b></i>, is a hip hop song with a strong electronic beat and witty lyrics. <span class="il">Members</span> felt a strong desire to hit the gym when this song came on.</div><div><br></div><div>Ryan's song,&nbsp;<i><b>hydrocodone by black kray</b>, </i>is a rage song which "demands subwoofers". Overlapping elements and heavy bass make this song work best at full volume.&nbsp;</div><div><br></div><div>Also, <font color="#0000ff"><b>Espresso</b></font> by <font color="#0000ff"><b>Sabrina Carpenter</b></font> was voted ~<font color="#f1c232"><b>song of the summer</b></font>~ in a close bracket final up against <b>Not Like Us</b> by <b>Kendrick Lamar</b>. Shout out Simon for organizing the bracket.&nbsp;</div><div><br></div><div><br></div><div>Hope to see you in at <b style="color:rgb(153,0,255)">5pm </b><font color="#000000">in</font><b style="color:rgb(153,0,255)"> Kresge 2420 </b><font color="#000000">on</font><b style="color:rgb(153,0,255)"> Thursday 10/10</b> ready for discussion of this weeks&nbsp;picks!</div><div><br></div><span class="gmail_signature_prefix">-- </span><br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><b><font color="#000000" face="arial black, sans-serif">Corey Dubin</font></b><div><font face="arial, sans-serif"><font color="#000000">Print Media Chair |&nbsp;</font><span style="color:rgb(0,0,0)">Music Tasting Club</span></font></div><div><img style="color:rgb(0,0,0)" width="96" height="96" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zNrrn3oTOOAPoBZRBRqJB4Zr5wvv0edj7ifc3122fcYOZrx7enXKzILiJkS_oI2bh6foix0WU7u1w4" class="CToWUd" data-bit="iit"></div><div><div><font color="#000000"><b><br></b></font><div><br></div><div><br></div></div></div></div></div></div>`,
}}
></div>
</> */

/* <EmailContent /> */

/* <div
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
                      </div> */
