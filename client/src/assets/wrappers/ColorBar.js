import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  .color-bar-wrapper {
    display: flex;
    align-items: center;
  }

  .scroll-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 1px 2px;
    margin: 0 2px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .scroll-button:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
  .color-bar-container {
    overflow: hidden; /* Hide the overflowing part of color bar */
    white-space: nowrap; /* Ensure items stay in a single line */
    width: 200px; /* Adjust width to show only 3 colors at a time */
  }
  .color-bar {
    display: flex;
    transition: transform 0.3s ease; /* Smooth transition for scrolling effect */
  }

  .color-box {
    width: 100px; /* Width of each color box */
    height: 100px; /* Height of each color box */
    display: inline-block;
    margin-right: 5px; /* Space between color boxes */
    border-radius: 4px; /* Optional: Rounded corners */
  }
`;

export default Wrapper;
