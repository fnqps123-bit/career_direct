import React, { useState } from "react";
import CoverPage from "./cover-page.jsx";
import ValueTowerBuilder from "./value-tower-builder.jsx";

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <CoverPage onStart={() => setStarted(true)} />;
  }

  return <ValueTowerBuilder />;
}
