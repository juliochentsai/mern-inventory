import styled from "styled-components";

const Wrapper = styled.div`
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    position: relative;
    height: 500px;
    width: 500px;
    max-width: 500px;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }

  .modal-image {
    width: 300px;
    height: auto;
  }
`;

export default Wrapper;
