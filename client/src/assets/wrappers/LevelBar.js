import styled from "styled-components";

const Wrapper = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .level_item {
    flex: 1;
    background-color: var(--background-secondary-color);

    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  .level_item:hover {
    background-color: #64748b;
    color: white;
  }
`;

export default Wrapper;
