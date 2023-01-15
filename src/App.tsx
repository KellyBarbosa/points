import React, { useState } from "react";
import "./App.css";
import boneco from "./img/img.png";

interface Position {
  x: number;
  y: number;
}

function App() {
  const [points, setPoints] = useState<Position[]>([]);
  const [backupPoints, setBackupPoints] = useState<Position[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const click: Position = { x: e.pageX, y: e.pageY };
    setPoints([...points, click]);
  };
  const handleUndo = () => {
    const removedPoint = points.pop();
    setPoints([...points]);
    if (removedPoint) setBackupPoints([...backupPoints, removedPoint]);
  };

  const handleRedo = () => {
    const addPoint = backupPoints.pop();
    if (addPoint) setPoints([...points, addPoint]);
    setBackupPoints([...backupPoints]);
  };

  const handleClean = () => {
    setPoints([]);
    setBackupPoints([]);
  };
  return (
    <>
      <div style={{ marginTop: 10, marginLeft: "50%" }}>
        <button disabled={points.length === 0} onClick={handleUndo}>
          Desfazer
        </button>
        <button
          disabled={backupPoints.length === 0}
          onClick={handleRedo}
          style={{ marginLeft: 2 }}
        >
          Refazer
        </button>
        <button
          disabled={backupPoints.length === 0 && points.length === 0}
          onClick={handleClean}
          style={{ marginLeft: 2 }}
        >
          Limpar
        </button>
      </div>

      <div className="App" onClick={handleClick}>
        {points.map((point, index) => (
          <div
            style={{
              position: "absolute",
              left: point.x - 25,
              top: point.y - 25,
            }}
            key={index}
          >
            <img src={boneco} width="50" height="50" alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
