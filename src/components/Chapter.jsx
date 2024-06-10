// Chapter.jsx
import React from "react";

function Chapter({ title, subtitle, percentage, handleClick, chapterId }) {
  return (
    <div
      className="h-60 w-3/4 bg-slate-800 rounded-lg flex flex-col items-center gap-2 border-solid border-white"
      style={{ borderWidth: "1.5px" }}
    >
      <p className="text-slate-400 font-bold m-2">{title}</p>
      <p className="text-slate-100 font-bold text-2xl">{subtitle}</p>
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
            className="text-white font-bold bg-blue-700 rounded-lg p-1"
            onClick={() => handleClick(chapterId)}
          >
            Practice Mode
          </button>
          <button
            className="text-white font-bold bg-blue-700 rounded-lg p-1"
            onClick={() => handleClick(chapterId, "shuffled")}
          >
            Shuffle Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
