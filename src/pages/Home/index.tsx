import React from "react";
import { Link } from "react-router-dom";
import { RouteWithSubRoutes, PropsWithSubRoutes } from "src/router";
const Home: React.FC<PropsWithSubRoutes> = ({ routes }) => {
  return (
    <div>
      <div className="navbar">
        <Link to="/discovery">发现</Link>
        <Link to="/mine">我的</Link>
      </div>
      <div className="main">
        {routes ? <RouteWithSubRoutes routes={routes} /> : null}
      </div>
    </div>
  );
};
export default Home;
