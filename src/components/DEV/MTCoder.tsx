//"HOOK" WE IMPORT FOR VARIABLE/COMPONENT INTERACTIONS
import { useState, useEffect } from "react";

//IMPORT BUTTON FROM EXISTING LIBRARY
import Button from "@mui/material/Button";

const MTCoders = () => {
  //VARIABLES!!!

  //   [Boolean variable, function that changes the boolean variable]
  const [boolBut, setBoolBut] = useState(false);
  const [numBut, setNumBut] = useState(0);
  const [message, setMessage] = useState("");

  //   useEffect( () => {the function}, [if variable changes, update function])
  //DO THIS CODE WHEN THIS VARIABLE CHANGES
  useEffect(
    () => {
      //DO THIS BLOCK OF CODE:
      console.log(`Button clicked ${numBut} times`);
      setMessage(message + "A");
    },
    [numBut] //WHEN THIS VARIABLE CHANGES
  );

  useEffect(() => {
    if (message == "AAAA") {
      console.log("AAAA");
    }
  }, [message]);

  return (
    <>
      {/*HOW YOU MAKE COMMENTS AFTER THE RETURN STATEMENT*/}

      <div className="faq">
        <Button variant="contained" onClick={() => setBoolBut(!boolBut)}>
          TRUE/FALSE Button (useState boolean)
        </Button>

        {/* IF ELSE STATEMENT */}
        {boolBut ? <h1>A</h1> : <h1>B</h1>}

        {/* IF STATEMENT */}
        {boolBut && <h3>Text above is "A"</h3>}

        {/* Boolean to String */}
        <h4>{boolBut.toString()}</h4>
      </div>

      <div className="faq2">
        {/* Notice the diff css class call... */}
        <Button variant="contained" onClick={() => setNumBut(numBut + 1)}>
          Counter Button (useState integer)
        </Button>
        <h2>{numBut}</h2>
        <h4>
          {/*IF / ELSE IF / ELSE STATEMENT*/}
          {/*IF OVER 20    PRINT  ELSE IF > 10        PRINT   ELSE   PRINT */}
          {numBut > 20 ? "Over 20!" : numBut > 10 ? "Over 10!" : "Under 10 :("}
        </h4>
      </div>
      <div className="faq">
        <Button variant="contained" onClick={() => setNumBut(numBut + 1)}>
          String Button (useEffect String)
        </Button>
        <h3>{message}</h3>
      </div>
    </>
  );
};

export default MTCoders;

// src/components/DEV/AidanComponent.tsx
// src/components/DEV/DanielComponent.tsx
