import { useState } from "react";
import Wrapper from "../assets/wrappers/ColorBar";

const colors = ["#FF0000", "#00FF00", "#0000FF", "#d9ff0076", "#cc00ff97"]; // Three colors

const ColorBar = ({ imageList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const numVisibleColors = 2; // Number of colors to show at a time

  // Calculate the range of colors to show
  const showColors = imageList.slice(startIndex, startIndex + numVisibleColors);
  console.log(showColors);

  // Determine if the left and right buttons should be disabled
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < colors.length - numVisibleColors;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <Wrapper>
      <div className="color-bar-wrapper">
        <button
          className="scroll-button"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          Left
        </button>
        <div className="color-bar-container">
          <div className="color-bar">
            {showColors.map((color, index) => (
              <img key={index} className="color-box" src={color} />
            ))}
          </div>
        </div>
        <button
          className="scroll-button"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          Right
        </button>
      </div>
    </Wrapper>
  );
};

export default ColorBar;
