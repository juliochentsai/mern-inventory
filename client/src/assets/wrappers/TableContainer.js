import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  table {
    width: 80%;
  }
  th,
  td {
    border: 0.1px solid #dddddd;
    text-align: center;
    padding: 0.1rem;
  }
  th {
    background-color: black;
    color: white;
  }
`;

export default Wrapper;
