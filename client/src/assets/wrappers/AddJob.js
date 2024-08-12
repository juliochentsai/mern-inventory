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
  @media (min-width: 992px) {
    .container {
      grid-template-columns: auto 1fr;
      width: 700px;
    }

    .container_item {
      display: flex;
    }
  }
`;

export default Wrapper;
