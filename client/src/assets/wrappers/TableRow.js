import styled from "styled-components";

const Wrapper = styled.tr`
  .row_last {
    border-style: none;
    display: flex;
  }
  .btn-edit {
    margin-right: 0.2rem;
    padding: 1px 2px;
    text-decoration: none;
    cursor: pointer;
    color: black; /* White text */
    font-size: 1rem;
    border: none;
    color: black;
    background-color: transparent;
  }
  .btn-edit:hover {
    background-color: black; /* Darker green */
    color: white;
  }
`;

export default Wrapper;
