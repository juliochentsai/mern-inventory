import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/BigSideBar";
import links from "../utils/links";
const BigSideBar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="nav-links">
          {links.map((x) => {
            const { text, path, icon } = x;
            return (
              <NavLink to={path} key={text} className="nav-link" end>
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
