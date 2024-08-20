import styled from "styled-components";

const Wrapper = styled.section`
  max-width: 36rem; /* 576px, based on a 16px root font size */
  margin: 0 auto;
  padding: 1.25rem; /* 20px */
  border: 1px solid #ddd;
  border-radius: 0.5rem; /* 8px */
  background-color: #f9f9f9;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); /* 4px 8px */
  form {
    display: flex;
    flex-direction: column;
  }
  .imageLabel {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  input[type="text"] {
    padding: 0.625rem; /* 10px */
    margin-bottom: 1rem; /* 16px */
    border: 1px solid #ccc;
    border-radius: 0.25rem; /* 4px */
    font-size: 1rem; /* 16px */
    width: 100%;
  }

  input[type="file"] {
    margin-bottom: 1rem; /* 16px */
  }

  /* Image Preview Styling */
  .imageView {
    display: block;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 0.25rem; /* 4px */
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1); /* 2px 4px */
    margin-bottom: 2rem;
  }

  /* Submit Button Styling */
  button[type="submit"] {
    padding: 0.625rem 1.25rem; /* 10px 20px */
    background-color: #007bff; /* Primary color */
    color: #fff;
    border: none;
    border-radius: 0.25rem; /* 4px */
    font-size: 1rem; /* 16px */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: #0056b3; /* Darker shade for hover effect */
  }

  button[type="submit"]:disabled {
    background-color: #6c757d; /* Disabled state color */
    cursor: not-allowed;
  }

  /* Responsive Design for Smaller Screens */
  @media (max-width: 48rem) {
    /* 768px */
    .container {
      padding: 1rem; /* 16px */
    }

    input[type="text"],
    input[type="file"] {
      font-size: 0.875rem; /* 14px */
    }

    button[type="submit"] {
      padding: 0.5rem 1rem; /* 8px 16px */
      font-size: 0.875rem; /* 14px */
    }
  }
`;

export default Wrapper;
