import styled from "styled-components";

const Wrapper = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  .img {
    display: block;
    max-width: 60px; /* Adjust size as needed */
    max-height: 60px; /* Adjust size as needed */
    object-fit: cover; /* Maintain aspect ratio and fill the dimensions */
    border-radius: 0.25rem; /* Rounds the corners of images */
    border: 1px solid #ddd; /* Adds a border around images */
  }

  td {
    padding: 0.75rem; /* Adds padding inside table cells */
    border-bottom: 1px solid #ddd; /* Adds a border below table cells */
  }

  .row_last {
    text-align: center; /* Centers the button */
  }

  /* Button Styling */
  .btn-delete {
    background-color: #dc3545; /* Bootstrap's danger color */
    color: #fff;
    border: none;
    border-radius: 0.25rem; /* Rounds the corners of the button */
    padding: 0.5rem 1rem; /* Adds padding inside the button */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-delete:hover {
    background-color: #c82333; /* Darker red for hover effect */
  }

  .btn-delete:focus {
    outline: none; /* Removes the default focus outline */
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); /* Adds a subtle focus shadow */
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    td {
      padding: 0.5rem; /* Reduces padding for smaller screens */
    }

    .btn-delete {
      padding: 0.4rem 0.8rem; /* Adjusts padding for smaller screens */
    }

    td img {
      max-width: 80px; /* Adjusts image size for smaller screens */
    }
  }
`;

export default Wrapper;
