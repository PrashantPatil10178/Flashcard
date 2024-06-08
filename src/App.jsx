import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Flashcards from "./components/Flashcards.jsx";

function App() {
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  function handleClick(test) {
    if (test == "shuffled") {
      setShuffle(true);
    } else {
      setShuffle(false);
    }
    setShowModal(!showModal);
  }

  let percentage;
  if (progress > 0) {
    percentage = Math.floor(((progress - 1) / 78) * 100);
  }

  return (
    <>
      <div className="h-full bg-slate-900 flex flex-col items-center gap-10">
        <h1 className="text-white text-2xl font-bold mt-14">Flashcards</h1>
        <div
          className=" h-60 w-3/4 bg-slate-800 rounded-lg flex flex-col items-center gap-2 border-solid border-white"
          style={{ borderWidth: "1.5px" }}
        >
          <p className="text-slate-400 font-bold m-2">Science 1</p>
          <p className="text-slate-100 font-bold text-2xl">Carbon Compounds</p>
          <div className="w-3/4 flex flex-col items-center">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-blue-200">
                    Total Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold inline-block text-blue-600">
                    {percentage > 0 ? `${percentage}%` : "0%"}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${percentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                className=" text-white font-bold bg-blue-700 rounded-lg p-1"
                onClick={handleClick}
              >
                Practice Mode
              </button>
              <button
                className="  text-white font-bold bg-blue-700 rounded-lg p-1"
                onClick={() => handleClick("shuffled")}
              >
                Shuffle Mode
              </button>
            </div>
          </div>
        </div>
      </div>
      <Flashcards
        showModal={showModal}
        handleClick={handleClick}
        setProgress={setProgress}
        progress={progress}
        shuffle={shuffle}
      />
    </>
  );
}

export default App;
