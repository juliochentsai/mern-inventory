import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  background: var(--background-secondary-color);
  display: flex;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-family: Didot, Didot LT STD, Hoefler Text, Garamond, Times New Roman,
      serif;
    font-size: clamp(1.5rem, 3vw, 3rem);
  }
`;

export default Wrapper;
