import React, { useState } from "react";
import Chapter from "./components/Chapter.jsx";
import Flashcard from "./components/Flashcards.jsx";
import ChemicalReactions from "./components/ChemicalReaction.jsx";

function App() {
  const initialProgressState = { 1: 0, 2: 0, 3: 0 };
  const initialModalState = { 1: false, 2: false, 3: false };
  const initialShuffleState = { 1: false, 2: false, 3: false };

  const [progress, setProgress] = useState(initialProgressState);
  const [showModal, setShowModal] = useState(initialModalState);
  const [shuffle, setShuffle] = useState(initialShuffleState);

  function handleClick(chapterId, mode) {
    setShuffle((prev) => ({ ...prev, [chapterId]: mode === "shuffled" }));
    setShowModal((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  }

  const chapters = [
    {
      id: 1,
      title: "Science 1",
      subtitle: "Carbon Compounds",
      component: Flashcard,
    },
    {
      id: 2,
      title: "Science 1",
      subtitle: "Chemical Reactions",
      component: ChemicalReactions,
    },
    {
      id: 3,
      title: "Random Title",
      subtitle: "Random Chapter Name",
      component: null,
    },
  ];

  return (
    <>
      <div className="h-full bg-slate-900 flex flex-col items-center gap-10 overflow-scroll">
        <h1 className="text-white text-2xl font-bold mt-14">Flashcards</h1>
        {chapters.map((chapter) => (
          <Chapter
            key={chapter.id}
            chapterId={chapter.id}
            title={chapter.title}
            subtitle={chapter.subtitle}
            percentage={Math.floor(((progress[chapter.id] - 1) / 78) * 100)}
            handleClick={handleClick}
          />
        ))}
      </div>
      {chapters.map((chapter) => {
        const FlashcardComponent = chapter.component;
        return FlashcardComponent ? (
          <FlashcardComponent
            key={chapter.id}
            showModal={showModal[chapter.id]}
            handleClick={() => handleClick(chapter.id)}
            setProgress={(value) =>
              setProgress((prev) => ({ ...prev, [chapter.id]: value }))
            }
            progress={progress[chapter.id]}
            shuffle={shuffle[chapter.id]}
          />
        ) : null;
      })}
    </>
  );
}

export default App;
