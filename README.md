# MUSIC TASTING CLUB WEBSITE

This project is the culmination of six months of blood, sweat, tears, and an unhealthy obsession with React/Typescript/MaterialUI. This website is not only meant as a resource for the Music Tasting Club (as a history of previous picks and to keep track of who has chosen albums/songs that quarter), but also as a way that prospective members first interact with and show interest in the club. There's five pages in this website, each of which will have its components explained below.

## HOME (src >> components >> SP >> `salespitch.tsx`)

The HOME page is the first page the user is brought to. This page is represented with the `<Salespitch />` tag and its contents can primarily be found in the `SP` folder. On Desktop, the salespitch page contains the first salespitch panel, the club's mission, and the music picks for next week (represented by `<ThisWeeksPick />`). There's a unique component just for mobile (`<ConditionalPhoneSignUp />`) which prompts the user to sign up for the club's GroupMe and fill out the club's interest form.

## PICKS (src >> components >> WE >> `WeeklyEntry.tsx`)

The PICKS page is the most robust page on the website. This page is represented by the `<WeeklyEntry />` tag. It includes the data from the club's previous picks (from each of its previous quarters of operation). This data can be found in the WE >> `picksData.json` file. Next, the page includes the `<ThisWeeksPick />` component as the **HOME** page does. On Desktop, the site includes a name wheel to keep track of the people who have/haven't picked an album/song in the current quarter (represented by `<PrizeWheel />`).
