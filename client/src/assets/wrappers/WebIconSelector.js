import styled from "styled-components";

const Wrapper = styled.div`
  .image-dropdown {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;

    border: none;
  }

  .image-dropdown-select {
    width: 70px;
    border: 1px solid #ccc;
  }
  .selected-image {
    margin-top: 10px;
  }

  .icon-image {
    width: 30px; /* Adjust size as needed */
    height: auto;
  }
`;

export default Wrapper;
