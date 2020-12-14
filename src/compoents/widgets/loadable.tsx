import React from "react";
import Loadable from "react-loadable";

// 通用过场组件
const loadingComponent: React.FC = () => {
  return <div>loading</div>;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (loader: () => Promise<any>, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading,
  });
};
