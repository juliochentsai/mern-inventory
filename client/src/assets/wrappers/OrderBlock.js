import styled from "styled-components";

const Wrapper = styled.div`
  .box {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-bottom: 0.2rem;
    background-color: var(--background-secondary-color);
    height: 60px;
    font-size: 0.9rem;
    color: var(--text-color);
    border-radius: 5px; /* Rounded corners */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* Shadow for depth effect */
  }

  .box:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Light grey overlay */
  }
  .box:active {
    background-color: rgba(0, 0, 0, 0.2); /* Darker grey overlay */
    transform: scale(0.99); /* Subtle scaling effect */
  }

  .box-item {
    margin: 1rem;
    padding: 0.4rem;
    flex: 1;
    text-align: center; /* Center the text */
    text-transform: uppercase;
  }

  .box-item:last-child {
    border-radius: 8px; /* Rounded corners for last item */
  }
  .box-approved {
    background-color: #d4edda; /* Light green background */
    color: #155724; /* Dark green text */
  }

  /* Style for pending status */
  .box-pending {
    background-color: #fff3cd; /* Light yellow background */
    color: #856404; /* Dark yellow text */
  }
  .box-approved,
  .box-pending {
    display: inline-flex;
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    padding: 0.4rem 0.8rem; /* Add padding around text */
    min-width: 100px;
  }
`;

export default Wrapper;
