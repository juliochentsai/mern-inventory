import styled from "styled-components";

const Wrapper = styled.section`
  .form-label {
    color: black;
    font-size: 1rem;
  }
  .form-row {
    margin-right: 1rem;
  }
  .container {
    background-color: #ffffff;
    padding: 20px; /* Optional: Add padding for spacing inside the box */
    border: 1px solid #cccccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
    margin: 20px; /* Optional: Add margin for spacing around the box */
    float: left; /* Float the box to the left */
  }

  .img-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
  .img {
    width: 100%;
    max-width: 400px; /* Adjust based on your needs */
    height: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: auto 1fr;
      width: 90%;
    }

    .container_top {
      display: flex;
    }
    .container_body {
      display: flex;
    }
    .container_ref {
      display: flex;
    }
  }
`;

export default Wrapper;
