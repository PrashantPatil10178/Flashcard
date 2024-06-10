import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast, faExpand } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCheck,
  faSun,
  faMoon,
} from "@fortawesome/free-regular-svg-icons";
import { Pagination, Virtual } from "swiper/modules";
import "./Flashcard.css";

function ChemicalReaction({
  showModal,
  handleClick,
  setProgress,
  progress,
  shuffle,
}) {
  const [cardData, setCardData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCardData = async () => {
      const frontImages = import.meta.glob(
        "../assets/Chemical reactions/*.webp"
      );
      const backImages = import.meta.glob(
        "../assets/Chemical reactions/*a.webp"
      );

      const data = await Promise.all(
        Array.from({ length: 69 }, async (_, index) => {
          const frontImageKey = `../assets/Chemical reactions/${
            index + 1
          }.webp`;
          const backImageKey = `../assets/Chemical reactions/${
            index + 1
          }a.webp`;

          const frontImage = frontImages[frontImageKey]
            ? await frontImages[frontImageKey]()
            : null;
          const backImage = backImages[backImageKey]
            ? await backImages[backImageKey]()
            : null;

          return { id: index + 1, frontImage, backImage };
        })
      );
      if (shuffle) {
        setCardData(shufflefun(data));
      } else {
        setCardData(data);
      }
    };

    fetchCardData();
    console.log("Came here 1");
  }, [shuffle]);

  const handleSlideChange = (swiper) => {
    if (progress === cardData.length) return;
    setProgress(swiper.realIndex + 1);
  };

  function shufflefun(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const handleReset = () => {
    setProgress(0);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      const elem = containerRef.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* this is for Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* this for Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        /* this edge  IE/Edge */
        elem.msRequestFullscreen();
      }

      /* TOH bhi nahi chal raha   */
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };
  console.log(cardData.length);
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-end w-full h-full bg-gray-900 bg-opacity-75 transition-transform duration-500 ${
        showModal ? "translate-y-0" : "translate-y-full"
      } ${isDarkMode ? "dark" : ""}`}
      ref={containerRef}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative bg-white w-full h-full rounded-t-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between gap-5 p-3 md:p-5 border-b rounded-t dark:border-gray-600">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={`text-2xl text-white ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {`${progress}/${cardData.length}`}
              </h3>
            </div>

            <div className="flex items-center gap-5">
              <button
                className="text-white dark:text-gray-900"
                onClick={toggleTheme}
              >
                <FontAwesomeIcon
                  icon={isDarkMode ? faSun : faMoon}
                  size="xl"
                  className={isDarkMode ? "text-white" : "text-black"}
                />
              </button>
              <button
                className="text-white dark:text-gray-900"
                onClick={toggleFullScreen}
              >
                <FontAwesomeIcon
                  icon={faExpand}
                  size="xl"
                  className={isDarkMode ? "text-white" : "text-black"}
                />
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>

          <Swiper
            direction={"vertical"}
            pagination={{
              type: "progressbar",
            }}
            onSlideChange={handleSlideChange}
            modules={[Pagination, Virtual]}
            virtual
            className="mySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {cardData.map((card, index) => (
              <SwiperSlide
                key={card.id}
                virtualIndex={index}
                className="flex flex-col justify-around items-center"
              >
                <Card
                  frontImage={card.frontImage?.default}
                  backImage={card.backImage?.default}
                />
                <hr className="border-black dark:border-white w-4/5 mt-10" />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center gap-10">
                <div
                  className="flex items-center justify-center gap-3 dark:bg-white dark:text-black text-white bg-blue-700 p-2 rounded-xl cursor-pointer"
                  onClick={handleReset}
                >
                  <FontAwesomeIcon
                    icon={faBackwardFast}
                    style={{ color: "#007AFF" }}
                    size="2x"
                  />
                  <p className="font-bold">Restart</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ChemicalReaction;
