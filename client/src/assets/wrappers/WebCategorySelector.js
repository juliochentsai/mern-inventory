import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;

  select {
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  select:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export default Wrapper;
