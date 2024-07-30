import React, { useState } from 'react';
import Timer from "./Components/Timer";
import ScrambleDisplay from "./Components/ScrambleDisplay";

const scrambles = [
  "R U R' U R U R2 F R2 U' R'",
  "F2 U' F' U' F U' F' U F'",
  "F U2 F U2 F U F2",
  "R U R' F' U' R U R' U' F R' F' R",
  "F' R2 F' R2 F' U' F2 R2",
  "F R U' R' F U' F' R' F' R",
  "F' U2 R U2 R' U2 F",
  "R U R' U F' R U R' U' R U R2 F2 R",
  "F' U' F R' F2 R F' U F",
  "R U' R' F R U' R2 F R",
  "R' F R F' R' F R2 U' R'",
  "R U' R' F R U' R2 F R",
  "R' F R F' U R U' R' F R U' R'",
  "F U' R' F2 R F' U2 F'",
  "F2 R U2 R' U' F2 U2 F'",
  "R' F R U' R' F R U' R U R' F'",
  "R' F R2 U' R' U F U F'",
  "F' U R U2 R' F U2 F",

  "R2 U R U' R2 F R U2 R' F",
  "R U2 R' U' R' F' R F R' F' R",
  "R2 U R U' R2 F R U2 R' F",
  "R U2 R' F R U' R' F' R U R'",
  "R U' R' F R U' R' F R U R' F'",
  "F' R' F R2 U R' U' R U R'",
  "R U2 R' U' R' F' R2 U R'",
  "R' F R2 U' R' U' R' F2 R",
  "R U' R2 F R U R U2 R'",
  "R' F R F' U R U' R' U F R U' R'",
  "R' U F R2 U' R2 U' F U' R",
  "R' F R F' U R U' R' U F R U' R'",
  "R' F' R2 U R' F' R U R'",
  "R U R2 F' R F R' F' R",
  "R' F' R2 U R' F' R U R'",
  "R' U' R U F2 U' F2 R U R",
  "R U R' F R U R' F U' R U' R'",
  "R U' R' U2 F R U2 R' F",

  "R U' R' U R U' R2 F' R F",
  "U R U R' F' R U2 R' U2 R U R'",
  "U F R U' R' F' R U R' F' R U R'",
  "U' R' F R U' R' F R2 U R' F' U2",
  "R' F R F' R' F R U R U2 R'",
  "R' F' R F' R' F' R F' R' F2 R",
  "R' U R2 U' R2 U' F R2 U' R'",
  "R U R2 F' R2 U' R2 U' R2 U' R2 U2 R",
  "R' U' R U' R' U2 F R2 U' R' U' R' F2 R",
  "R U2 R' F R U' R2 F' R",
  "R' F R2 U R' F' R U2 R'",
  "R U2 R' F R U' R2 F' R",
  "R U R' F' R U R' U' F R' F' R",
  "F' R' F R U' R U R' U' R U R' U'",
  "R' F R F U2 F U' F2",
  "U2 F R U' R' U R' F' R U R' F' R",
  "R' U2 F R U2 R U' R2 F",
  "R' F' R F U' R' F' R U R' F' R"
];

function App() {
  const [currentScramble, setCurrentScramble] = useState(scrambles[Math.floor(Math.random() * scrambles.length)]);

  const updateScramble = () => {
    setCurrentScramble(scrambles[Math.floor(Math.random() * scrambles.length)]);
  };

  return (
    <div>
      <ScrambleDisplay scramble={currentScramble} />
      <Timer onStop={updateScramble} />
    </div>
  );
}

export default App;
