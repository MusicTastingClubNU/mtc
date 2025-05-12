import React, { useState, useRef, useEffect, JSX } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  deleteWheelEntry,
  updateNextWeeksPick,
} from "../../firebase/FirebaseFunctions";
import { addWheelEntry } from "../../firebase/FirebaseFunctions";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { getDoc } from "firebase/firestore";
import { useNameWheelData } from "../DEV/NameWheelDataFetching";

interface PrizeWheelProps {
  title: string;
  handlePickChange: (event: SelectChangeEvent) => void;
}

const getFirestoreFieldFromPick = (pick: string): string | null => {
  switch (pick) {
    case "Album of the Week":
      return "AotW";
    case "Runner Up Album of the Week":
      return "RUAotW";
    case "Song of the Week":
      return "SotW";
    case "Runner Up Song of the Week":
      return "RUSotW";
    default:
      return null;
  }
};
type PushingNewListToDBProps = {
  label: string;
  setInputFunc: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  dbInputName: string;
  buttonTitle: string;
};
const PushingNewListToDB: React.FC<PushingNewListToDBProps> = ({
  label,
  setInputFunc,
  input,
  dbInputName,
  buttonTitle,
}) => {
  return (
    <div style={{ padding: 10, marginLeft: 10 }}>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setInputFunc(e.target.value)}
        value={input} // ✅ MUST be bound to state
        sx={{ width: 400 }}
        size="small"
      />
      <Button
        variant="contained"
        size="small"
        sx={{ marginLeft: 3, marginTop: 2.5 }}
        onClick={async () => {
          const updatedList = input
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
          try {
            await updateDoc(doc(db, "nameWheel", dbInputName), {
              names: updatedList,
            });
            console.log("✅ Updated " + dbInputName + " DB");
          } catch (err) {
            console.error("❌ Failed to update " + dbInputName + " DB", err);
          }
        }}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};
interface PrizeWheelProps {
  title: string;
  // albums: string[];
  // songs: string[];
  // onceThru: string[];
  handlePickChange: (event: SelectChangeEvent) => void;
}
const PrizeWheel: React.FC<PrizeWheelProps> = ({
  title,
  // albums,
  // songs,
  // onceThru,
  handlePickChange,
}) => {
  const { albums, songs, onceThru } = useNameWheelData();
  const [pick, setPick] = useState("Album of the Week");
  const [wheelType, setWheelType] = useState("Once Through");
  const [prizeList, setPrizeList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [onceThruInput, setOnceThruInput] = useState("");
  const [albumInput, setAlbumInput] = useState("");
  const [songInput, setSongInput] = useState("");

  useEffect(() => {
    setPick(title);
  }, [title]);
  const [nextWeekData, setNextWeekData] = useState<{
    AotW?: string;
    RUAotW?: string;
    SotW?: string;
    RUSotW?: string;
  }>({});
  useEffect(() => {
    const fetchOnceThruList = async () => {
      try {
        const snap = await getDoc(doc(db, "nameWheel", "OnceThrough"));
        if (snap.exists()) {
          const list = snap.data().names || [];
          setOnceThruInput(list.join(", ")); // ✅ sets input with DB data
        }
      } catch (err) {
        console.error("Error fetching Once Through DB:", err);
      }
    };
    const fetchAlbumsList = async () => {
      try {
        const snap = await getDoc(doc(db, "nameWheel", "Albums"));
        if (snap.exists()) {
          const list = snap.data().names || [];
          setAlbumInput(list.join(", ")); // ✅ sets input with DB data
        }
      } catch (err) {
        console.error("Error fetching Once Through DB:", err);
      }
    };
    const fetchSongsList = async () => {
      try {
        const snap = await getDoc(doc(db, "nameWheel", "Songs"));
        if (snap.exists()) {
          const list = snap.data().names || [];
          setSongInput(list.join(", ")); // ✅ sets input with DB data
        }
      } catch (err) {
        console.error("Error fetching Once Through DB:", err);
      }
    };
    fetchAlbumsList();
    fetchSongsList();
    fetchOnceThruList();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "picksToAdd", "nextWeeksPicks"),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNextWeekData(data.nextWeek); // example state setter
        }
      }
    );

    return () => unsubscribe(); // clean up listener
  }, []);

  useEffect(() => {
    let list: string[] = [];
    switch (pick) {
      case "Album of the Week":
      case "Runner Up Album of the Week":
        list = albums;
        break;
      case "Song of the Week":
      case "Runner Up Song of the Week":
        list = songs;
        break;
      default:
        list = onceThru;
    }
    setPrizeList(list);
    setInputValue(list.join(", "));
  }, [pick, albums, songs, onceThru]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setPick(value);
    handlePickChange(event);
  };

  const handleWheelTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setWheelType(value);
  };

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    const targetAngle = angle + 360 * (3 + Math.random() * 2);
    const duration = 4000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress =
        progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

      const newAngle = angle + easedProgress * (targetAngle - angle);
      setAngle(newAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const finalAngle = newAngle % 360;
        const prizeIndex =
          Math.floor(prizeList.length - (finalAngle / 360) * prizeList.length) %
          prizeList.length;
        setSelectedPrize(prizeList[prizeIndex]);
      }
    };
    requestAnimationFrame(animate);
  };

  const handlePrizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const updated = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setPrizeList(updated);
  };

  useEffect(() => {
    let list: string[] = [];

    if (wheelType === "Once Through") {
      list = onceThru;
    } else {
      switch (pick) {
        case "Album of the Week":
        case "Runner Up Album of the Week":
          list = albums;
          break;
        case "Song of the Week":
        case "Runner Up Song of the Week":
          list = songs;
          break;
        default:
          list = [];
      }
    }

    setPrizeList(list);
    setInputValue(list.join(", "));
  }, [pick, wheelType, albums, songs, onceThru]);

  const handleDialogClose = async () => {
    if (!selectedPrize) return;

    let category: "Albums" | "Songs" | "OnceThrough" | null = null;
    const isOnceThrough = wheelType === "Once Through";

    if (
      pick === "Album of the Week" ||
      pick === "Runner Up Album of the Week"
    ) {
      category = isOnceThrough ? "OnceThrough" : "Albums";
    } else if (
      pick === "Song of the Week" ||
      pick === "Runner Up Song of the Week"
    ) {
      category = isOnceThrough ? "OnceThrough" : "Songs";
    }

    if (category) {
      try {
        console.log(`Deleting "${selectedPrize}" from category: ${category}`);
        await deleteWheelEntry(category, selectedPrize);

        // Add to Albums or Songs if from OnceThrough
        if (isOnceThrough) {
          if (pick.includes("Album")) {
            await addWheelEntry("Songs", selectedPrize);
          } else if (pick.includes("Song")) {
            await addWheelEntry("Albums", selectedPrize);
          }
        }
      } catch (err) {
        console.error("Error handling pick transition:", err);
      }
    }

    setPrizeList((prev) => {
      const updated = prev.filter((p) => p !== selectedPrize);
      setInputValue(updated.join(", "));
      if (category == "OnceThrough") {
        setOnceThruInput(updated.join(", "));
      }
      if (category == "Albums") {
        setAlbumInput(updated.join(", "));
      }
      if (category == "Songs") {
        setSongInput(updated.join(", "));
      }
      return updated;
    });

    const firestoreField = getFirestoreFieldFromPick(pick);
    if (firestoreField) {
      try {
        await updateNextWeeksPick(firestoreField, selectedPrize);
        console.log(`Successfully set ${firestoreField} to ${selectedPrize}`);
      } catch (err) {
        console.error("Error updating next week's picks:", err);
      }
    }

    setSelectedPrize(null);
  };

  const handleDialogCloseCancel = () => {
    setSelectedPrize(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const radius = canvas.width / 2;
    const arc = (2 * Math.PI) / prizeList.length;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(radius, radius);
    context.rotate((angle * Math.PI) / 180);

    prizeList.forEach((prize, i) => {
      context.beginPath();
      context.fillStyle = `hsl(${(i * 360) / prizeList.length}, 100%, 75%)`;
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.moveTo(0, 0);
      context.arc(0, 0, radius, i * arc, (i + 1) * arc);
      context.lineTo(0, 0);
      context.fill();
      context.stroke();

      context.save();
      context.rotate((i + 0.5) * arc);
      context.translate(radius * 0.6, 10);
      context.fillStyle = "black";

      let fontSize = Math.min(24, (radius * 0.3) / Math.sqrt(prizeList.length));
      context.font = `bold ${fontSize}px Arial`;
      while (context.measureText(prize).width > radius * 0.6 && fontSize > 10) {
        fontSize -= 2;
        context.font = `bold ${fontSize}px Arial`;
      }

      context.textAlign = "center";
      context.fillText(prize, 0, 0);
      context.restore();
    });

    context.restore();

    // Draw ticker
    context.beginPath();
    context.moveTo(radius + 55, radius);
    context.lineTo(radius + 35, radius - 15);
    context.lineTo(radius + 35, radius + 15);
    context.closePath();
    context.fillStyle = "black";
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();

    // Spin button
    context.beginPath();
    context.arc(radius, radius, 40, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.stroke();

    // Spin text
    context.fillStyle = "white";
    context.font = "bold 20px Arial";
    context.textAlign = "center";
    context.fillText("SPIN", radius, radius + 7);
  }, [angle, prizeList]);

  return (
    <>
      <div className="faq">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <div
            style={{
              display: "flex", // Required for flexbox
              flexDirection: "row", // Horizontal layout
              alignItems: "center", // Vertical centering (optional)
              justifyContent: "center", // Horizontal centering
              gap: "1rem",
            }}
          >
            <FormControl size="small">
              <InputLabel id="pick-label">Pick</InputLabel>
              <Select
                labelId="pick-label"
                value={pick}
                label="Pick"
                onChange={handleChange}
                sx={{ width: 270 }}
              >
                <MenuItem value="Album of the Week">Album of the Week</MenuItem>
                <MenuItem value="Runner Up Album of the Week">
                  Runner Up Album of the Week
                </MenuItem>
                <MenuItem value="Song of the Week">Song of the Week</MenuItem>
                <MenuItem value="Runner Up Song of the Week">
                  Runner Up Song of the Week
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="wheel-type-label">Wheel Type</InputLabel>
              <Select
                labelId="wheel-type-label"
                value={wheelType}
                label="Wheel Type"
                onChange={handleWheelTypeChange}
                sx={{ width: 225 }}
              >
                <MenuItem value="Once Through">Once Through</MenuItem>
                <MenuItem value="Everybody Picked">
                  Everybody Picked Once
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={spin}
            style={{
              backgroundColor: "black",
              borderRadius: "50%",
              marginTop: 30,
            }}
          />

          <TextField
            label="Have NOT Picked"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handlePrizeChange}
            value={inputValue}
            sx={{ width: 500 }}
            size="small"
          />

          <Dialog open={!!selectedPrize} onClose={handleDialogClose}>
            <DialogTitle sx={{ textAlign: "center", fontSize: "2rem" }}>
              {title} Pick Goes To:
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center", fontSize: "2rem" }}>
              🎉 {selectedPrize} 🎉
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={handleDialogClose}
                variant="contained"
                color="primary"
              >
                Return to Wheel
              </Button>
              <Button
                onClick={handleDialogCloseCancel}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
      <div
        className="faq"
        style={{
          flex: "wrap",
          justifyContent: "center",
          flexDirection: "row",
          padding: 3,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 5, marginTop: 5 }}>
          UPDATE DATA IN CLOUD DATABASE
        </h1>
        {wheelType == "Once Through" ? (
          <PushingNewListToDB
            label={"Current Once-Thru List"}
            setInputFunc={setOnceThruInput}
            input={onceThruInput}
            dbInputName={"OnceThrough"}
            buttonTitle={"Push List To 1ce Thru DB"}
          />
        ) : wheelType == "Everybody Picked" &&
          (pick == "Album of the Week" ||
            pick == "Runner Up Album of the Week") ? (
          <PushingNewListToDB
            label={"Current 'They Picked Song, Need Album' List"}
            setInputFunc={setAlbumInput}
            input={albumInput}
            dbInputName={"Albums"}
            buttonTitle={"Push List 2 'Picked Song, Need Album' DB"}
          />
        ) : (
          wheelType == "Everybody Picked" &&
          (pick == "Song of the Week" ||
            pick == "Runner Up Song of the Week") && (
            <PushingNewListToDB
              label={"Current 'They Picked Album, Need Song' List"}
              setInputFunc={setSongInput}
              input={songInput}
              dbInputName={"Songs"}
              buttonTitle={"Push List 2 'Picked Album, Need Song' DB"}
            />
          )
        )}
      </div>
    </>
  );
};

export default PrizeWheel;
