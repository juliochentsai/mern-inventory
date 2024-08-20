import styled from "styled-components";

const Wrapper = styled.section`
  .container {
    width: 90%;
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 20px;
  }

  .category-container {
    display: flex; /* Use Flexbox to align items horizontally */
    align-items: center; /* Center items vertically */
    gap: 0.2rem; /* Add space between items */
  }

  /* Styling for each category item */
  .category {
    font-size: 0.8rem;
    color: #333; /* Set text color */
    padding: 0.2rem; /* Add padding */
  }

  .product-section {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .image-wrapper {
    padding: 1rem; /* Padding around the image */
    display: flex; /* Center image inside the wrapper */
    flex-direction: column;

    justify-content: center; /* Center image horizontally */
  }
  .product-img {
    width: 200px; /* Make the image take up the full width of the container */
    height: auto; /* Make the image take up the full height of the container */
    object-fit: cover; /* Ensure the image covers the dimensions without distortion */
  }
  .product-img-bar {
    width: 20px;
  }

  .product-details {
    width: 90%;
    padding: 1.5rem;

    margin: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  /* Product title styling */
  .product-details h5 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
  }

  /* Product description styling */
  .product-details p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
  }
  .product-details img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 16px;
  }
  /* Price styling */
  .product-details .price {
    font-size: 1.25rem;
    color: #28a745;
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* Styling for color bar section */
  .product-details .color-bar {
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #ddd;
  }

  .product-details .color-bar h5 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
  }

  /* Styling for color options */
  .product-details .color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .product-details .color-options div {
    padding: 10px;
    background-color: #eee;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    min-width: 100px;
    text-align: center;
    font-size: 0.9rem;
  }

  //Paragraph
  .formatted-text ul {
    padding-left: 1rem; /* Indentation for list items */
    margin: 0; /* Remove default margin */
    list-style-type: disc; /* Bullet style */
  }

  .bullet-item {
    margin-bottom: 10px; /* Add some space between list items */
  }

  .normal-text {
    margin: 0; /* Remove margin for non-bulleted lines */
    line-height: 1.5; /* Improve readability */
  }

  /* Scroll bar */
  .svg-container {
    width: 40px;
  }

  .icon-size {
    width: 100px;
    height: auto; /* or you can use height: 100px; */
  }
`;
export default Wrapper;
