import picksData from "../WE/picksData.json";
import { TextField, Box } from "@mui/material";
export default function UpdatePicks() {
  const lastWeeksRUSotWPickId = Math.max(
    ...picksData.flatMap((quarter: any) =>
      quarter.weeks.flatMap((week: any) =>
        week.picks.map((pick: any) => pick.pickId)
      )
    )
  );
  const nextWeeksAotW = [lastWeeksRUSotWPickId + 1, "Album of the Week"];
  const nextWeeksRUAotW = [
    lastWeeksRUSotWPickId + 2,
    "Runner Up Album of the Week",
  ];
  const nextWeeksSotW = [lastWeeksRUSotWPickId + 3, "Song of the Week"];
  const nextWeeksRUSotW = [
    lastWeeksRUSotWPickId + 4,
    "Runner Up Song of the Week",
  ];

  const pickFields = [
    "pickId",
    "pickType",
    "songOrAlbumName",
    "artistName",
    "memberName",
    "songOrAlbumArt",
  ];

  const stylez = {
    "& .MuiInputBase-root": {
      height: "40px", // Adjust height here
    },
    "& .MuiOutlinedInput-input": {
      padding: "5px 10px", // Adjust padding inside the input
    },
    marginTop: 1,
  };

  /* {
            "pickId": 122,
            "pickType": "Song of the Week",
            "songOrAlbumName": "Better Hate",
            "artistName": "Jessica Pratt",
            "memberName": "Joseph",
            "songOrAlbumArt": "https://i.scdn.co/image/ab67616d0000b273a1a84846a9c52d4c965e7211"
          }, */

  return (
    <>
      {/* <div className="faq2">
        {nextWeeksPickIds.map((row) => (
          <div
            style={{
              alignItems: "center",
              flex: "wrap",
              gap: 10,
            }}
          >
            <h3>pickId: {row[0]},</h3>
            <h3>pickType: {row[1]}</h3>
            <TextField variant="outlined" label=""></TextField>
          </div>
        ))}

        <TextField variant="outlined" label=""></TextField>
      </div> */}
      <div className="faq">
        <h3>Album Of The Week</h3>
        <h4>pickId: {nextWeeksAotW[0]}</h4>
        <h4>pickType: {nextWeeksAotW[1]}</h4>
        <div>
          <TextField
            label="songOrAlbumName"
            variant="outlined"
            size="small"
            sx={stylez}
          />
        </div>
        <div>
          <TextField
            label="artistName"
            variant="outlined"
            size="small"
            sx={stylez}
          />
        </div>
        <div>
          <TextField
            label="memberName"
            variant="outlined"
            size="small"
            sx={stylez}
          />
        </div>
        <div>
          <TextField
            label="songOrAlbumArt"
            variant="outlined"
            size="small"
            sx={stylez}
          />
        </div>
      </div>
    </>
  );
}
