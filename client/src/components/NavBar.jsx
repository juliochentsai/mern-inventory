import Wrapper from "../assets/wrappers/Navbar";
import LogoutContainer from "./LogoutContainer";
const NavBar = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="logo">OTTONI</div>
        <div>
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
