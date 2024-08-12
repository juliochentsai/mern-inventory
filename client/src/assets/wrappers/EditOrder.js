import styled from "styled-components";

const Wrapper = styled.section`
  width: 80%;
  max-width: 1200px;
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .label-top-box {
    margin-top: 1rem;
    display: flex;
    width: 80%;
    justify-content: space-between;
  }

  .order_table {
    width: 80%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  .top_table_label {
    margin-bottom: 0.5rem;
  }
  .label-box {
    display: flex;
    flex-direction: column;
  }

  .label {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .description-box {
    width: 100%;
    height: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .add-row-button {
    all: unset;
    display: inline-block;
    cursor: pointer;
  }
`;

export default Wrapper;
