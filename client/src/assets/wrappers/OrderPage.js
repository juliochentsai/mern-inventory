import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
  }
  .header-box {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    margin-bottom: 1rem;
    align-items: center;

    font-size: 1rem;
    color: var(--text-color);
  }

  .header-box-item {
    font-weight: bold;
    padding: 8px;
    flex: 1; /* Ensure all items take up the same space */
    text-align: center; /* Center the text */
    text-transform: uppercase;
    text-decoration: underline;
  }
`;

export default Wrapper;
