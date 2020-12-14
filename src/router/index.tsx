import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
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
    path: "/",
    component: Home,
    exact: true,
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
  {
    path: "/playlist/:id",
    component: loadable(() => import("src/pages/Playlist")),
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
        //   <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <BrowserRouter>
      <RouteWithSubRoutes routes={routes} />
    </BrowserRouter>
  );
}
