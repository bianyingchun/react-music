import React, { Children } from "react";
import {
  BrowserRouter,
  // Switch,
  // Route,
  RouteComponentProps,
} from "react-router-dom";
import {
  CacheRoute as Route,
  CacheSwitch as Switch,
} from "react-router-cache-route";
import loadable from "src/compoents/widgets/loadable";
import Home from "../pages/Home";

interface RouteItem {
  path: string;
  component: any;
  exact?: boolean;
  routes?: RouteItem[];
}
export interface PropsWithSubRoutes extends RouteItem, RouteComponentProps {}
export const routes: RouteItem[] = [
  {
    path: "/search",
    component: loadable(() => import("src/pages/Search")),
  },
  {
    path: "/comment/:type/:id",
    exact: true,
    component: loadable(() => import("src/pages/Comment")),
  },
  {
    path: "/taste",
    exact: true,
    component: loadable(() => import("src/pages/RecommendTaste")),
  },
  {
    path: "/artists",
    exact: true,
    component: loadable(() => import("src/pages/ArtistList")),
  },
  {
    path: "/artist/:id/music",
    exact: true,
    component: loadable(() => import("src/pages/AristMusic")),
  },
  {
    path: "/artist/:id",
    exact: true,
    component: loadable(() => import("src/pages/Artist")),
  },
  {
    path: "/user/:id/follows",
    exact: true,
    component: loadable(() => import("src/pages/UserFollow")),
  },
  {
    path: "/user/:id/followeds",
    exact: true,
    component: loadable(() => import("src/pages/UserFollowed")),
  },
  {
    path: "/user/:id",
    exact: true,
    component: loadable(() => import("src/pages/User")),
  },
  {
    path: "/toplist",
    exact: true,
    component: loadable(() => import("src/pages/Toplist")),
  },
  {
    path: "/playlist/square",
    exact: true,
    component: loadable(() => import("src/pages/PlaylistSquare")),
  },
  {
    path: "/playlist/:id",
    exact: true,
    component: loadable(() => import("src/pages/Playlist")),
  },
  {
    path: "/",
    component: Home,
    // exact: true,
    routes: [
      {
        path: "/discovery",
        component: loadable(() => import("src/pages/Discovery")),
      },
      {
        path: "/mine",
        component: loadable(() => import("src/pages/Mine")),
      },
    ],
  },
];

export const RouteWithSubRoutes: React.FC<{ routes: RouteItem[] }> = ({
  routes,
}) => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={(props) => <route.component {...props} {...route} />}
        />
      ))}
    </Switch>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return <RouteWithSubRoutes routes={routes} />;
}
