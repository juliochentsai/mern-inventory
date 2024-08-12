import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  min-height: 40vh;
  width: 70%;
  background-color: #ffffff;
  padding: 2rem; /* Optional: Add padding for spacing inside the box */
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
  padding-bottom: 4rem;
  .label-header {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .label-top-box {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .table-box {
    width: 80%;
    padding: 1rem;
  }

  .row {
    display: flex;
  }
  .row-descripcion {
    flex: 7;
    text-align: left; /* Align text to the left */
  }
  .row-other {
    flex: 2;
    text-align: left; /* Align text to the left */
  }
  .btn-approve {
    position: absolute;
    display: flex;
    bottom: 2rem; /* Adjust the distance from the bottom */
    right: 20px; /* Adjust the distance from the right */
  }
  .btn {
    margin-left: 1rem;
  }

  .btn-modify {
    background-color: gray;
    cursor: default;
  }
  .btn-modify:hover,
  .btn-modify:focus,
  .btn-modify:active {
    box-shadow: none; /* Removes any shadow effect */
  }
`;

export default Wrapper;
