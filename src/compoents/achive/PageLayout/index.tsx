import React from "react";
import "./style.scss";
import { useBack } from "src/hooks/shared";
interface Props {
  title: string;
  tools?: React.ReactNode;
  main: React.ReactNode;
  navbar?: React.ReactNode;
  onBack?: () => void;
  className?: string;
}

const Page: React.FC<Props> = ({
  title,
  tools,
  main,
  navbar,
  onBack,
  className,
}) => {
  const { back } = useBack();
  function onClickBack() {
    if (onBack) {
      onBack();
    } else {
      back();
    }
  }
  let cls = "page-layout" + (className ? " " + className : "");
  return (
    <div className={cls}>
      <div className="page-layout-header">
        <div className="page-title-bar">
          <span className="iconfont icon-back" onClick={onClickBack}></span>
          <span className="title">{title || ""}</span>
          <div className="toolbar">{tools}</div>
        </div>
        <div className="navbar">{navbar}</div>
      </div>
      <div className="page-layout-main">{main}</div>
    </div>
  );
};

export default Page;
