import styled from "styled-components";

const Wrapper = styled.section`
  width: 90%;
  border-collapse: collapse; /* Ensures borders between cells do not double */
  margin: 20px 0; /* Adds space above and below the table */

  .table-container {
    width: 90%;
    margin: 0 auto;
  }
  .table-head-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    text-align: left;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd; /* Adds a border below table cells */
  }

  th {
    margin-left: 1rem;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9; /* Alternating row colors for better readability */
  }

  tr:nth-child(odd) {
    background-color: #fff; /* Ensure odd rows have white background */
  }

  td {
    padding: 0.75rem; /* Padding inside table cells */
    border-bottom: 1px solid #ddd; /* Adds a border below table cells */
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    table {
      font-size: 0.875rem; /* Adjusts font size for smaller screens */
    }
    th,
    td {
      padding: 0.5rem; /* Reduces padding for smaller screens */
    }
  }
`;

export default Wrapper;
