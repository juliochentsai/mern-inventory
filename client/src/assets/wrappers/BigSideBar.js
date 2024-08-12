import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 922px) {
    display: block;
    .sidebar-container {
      background: var(--background-secondary-color);
      min-height: 100vh;
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
    }
    .icon {
      margin-right: 1rem;
    }
  }
`;

export default Wrapper;
