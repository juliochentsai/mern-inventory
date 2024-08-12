import styled from "styled-components";

const Wrapper = styled.section`
  width: 80%;
  background-color: #ffffff;
  padding: 20px; /* Optional: Add padding for spacing inside the box */
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
  margin: 20px; /* Optional: Add margin for spacing around the box */

  .calendar {
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .label-top-box {
    margin-top: 1rem;
    display: flex;
    width: 80%;
  }
  .label-box-input {
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .label {
    display: block;
    margin-bottom: 0.5rem;

    font-size: 1rem;
  }
  .order_table {
    width: 80%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  .top_table_label {
    margin-bottom: 0.5rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .description-box {
    width: 80%;
    height: 1rem; /* Full viewport height */
    border: 1px solid #ddd;
    margin: 0.05rem;
  }
  .label_title {
    width: 20%;
  }
  .description-label {
    width: 80%;
  }

  .add-row-button {
    all: unset;
    display: inline-block;
    cursor: pointer;
  }

  .cancel-btn {
    margin-left: 2rem;
  }
`;

export default Wrapper;
