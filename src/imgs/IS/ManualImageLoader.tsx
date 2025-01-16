import React from "react";
import YsAlbumArt from "../manualAlbumArt/WQ24_W2_AotW.png";

export const manualArtLoader = (albumOrSongName: string) => {
  return (
    <>
      {" "}
      {albumOrSongName === "Q1W2AotW" ? (
        <img
          key={"YsAlbumArtKey"}
          src={YsAlbumArt}
          alt={"Ys"}
          style={{ width: "100px", height: "100px", margin: "10px" }}
        />
      ) : (
        ""
      )}
    </>
  );
};
