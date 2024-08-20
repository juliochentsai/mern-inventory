import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .container {
    width: 90%;
    background-color: #ffffff;
    padding: 2rem;
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 1rem;
  }

  .container_item {
    display: grid;
  }
  .container_item label {
    margin-top: 0.5rem; /* Space between label and select */
    display: flex;
    flex-direction: column;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .container_item input[type="text"] {
    border: 1px solid #ccc;
    padding: 0.1rem; /* Add padding inside the select box */
  }
  .container_item textarea {
    border: 1px solid #ccc; /* Light border for the select box */
    border-radius: 2px;
  }

  .container_item textarea {
    line-height: 1.4;
    font-size: 0.875rem;
    padding: 0.25em 0.5em;
    min-height: 100px; /* Minimum height for the textarea */
    resize: vertical; /* Allow vertical resizing only */
  }

  .container_item input[type="text"]:focus,
  .container_item textarea:focus {
    outline: none; /* Remove default focus outline */
    border-color: rgba(0, 123, 255, 0.5); /* Blue border on focus */
    box-shadow: 0 0 1px rgba(0, 123, 255, 0.5); /* Shadow on focus for better visibility */
  }

  /* Table CODE and NAME */

  .table_header {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(70px, 1fr)
    ); /* Adjust column widths as needed */

    font-weight: bold; /* Bold text for headers */
  }
  .table_row {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(70px, 1fr)
    ); /* Match column widths to header */
    align-items: center; /* Center items vertically */
    border: none;
  }
  .table_row input {
    border: 1px solid #ccc;
  }

  .table_row input[readonly] {
    background-color: #f5f5f5;
    cursor: not-allowed; /* Change cursor to indicate readonly status */
  }

  /* ADD BUtton */
  .add-row-button {
    background: none; /* Primary button color */
    color: black; /* Text/icon color */
    border: none; /* Remove default border */

    cursor: pointer; /* Change cursor to pointer on hover */
    transition: background-color 0.3s; /* Smooth transition for color change */
  }

  .add-row-button:hover {
    background: none;
    color: #0056b3; /* Darker color on hover */
  }

  .add-row-button:active {
    background: none;
    color: #004080; /* Even darker color on click */
  }
`;

export default Wrapper;
