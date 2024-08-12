import Wrapper from "../assets/wrappers/Landing";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h2>WELCOME TO OTTONI MANAGEMENT</h2>
          <div className="container_btn">
            <Link to="/register" className="btn register-link">
              Register
            </Link>
            <Link to="/login" className="btn ">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
