import React from "react";
import YsAlbumArt from "../manualAlbumArt/WQ24_W2_AotW.png";
import NeuAlbumArt from "../manualAlbumArt/WQ24_W3_RUSotW.png";
import TempaTAlbumArt from "../manualAlbumArt/WQ24_W9_RUSotW.png";
import FreeAlbumArt from "../manualAlbumArt/SQ24_W2_SotW.png";

//Q1W2AotW Q1W3RUSotW Q1W9RUSotW Q2W2SotW

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
      ) : albumOrSongName === "Q1W3RUSotW" ? (
        <img
          key={"NeuAlbumArtKey"}
          src={NeuAlbumArt}
          alt={"Neu"}
          style={{ width: "100px", height: "100px", margin: "10px" }}
        />
      ) : albumOrSongName === "Q1W9RUSotW" ? (
        <img
          key={"TempaTAlbumArtKey"}
          src={TempaTAlbumArt}
          alt={"TempaT"}
          style={{ width: "100px", height: "100px", margin: "10px" }}
        />
      ) : albumOrSongName === "Q2W2SotW" ? (
        <img
          key={"FreeAlbumArtKey"}
          src={FreeAlbumArt}
          alt={"Free"}
          style={{ width: "100px", height: "100px", margin: "10px" }}
        />
      ) : (
        ""
      )}
    </>
  );
};
