import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0; /* Remove default margins */
  padding: 0; /* Remove default padding */
  overflow: hidden; /* Hide overflow if necessary */
  display: flex; /* Flexbox for layout */
  flex-direction: column; /* Arrange children vertically */

  .row-input {
    margin: 0.05rem;
    border: 1px solid #ddd;
    height: 1rem; /* Full viewport height */
  }
`;

export default Wrapper;
