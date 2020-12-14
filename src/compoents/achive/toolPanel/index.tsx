import React, { useState } from "react";
import "./style.scss";
import BottomPanel from "../../widgets/BottomPanel";
import { title } from "process";
interface ToolItem {
  icon: string;
  text: string;
  action: () => void;
}
interface ToolPanel {
  title: string;
  list: ToolItem[];
}
const ToolPanel: React.FC<ToolPanel> = ({ title, list }) => {
  const [visible, setVisible] = useState(false);
  function onSelectItem(item: ToolItem) {
    item.action();
    setVisible(false);
  }
  return (
    <div className="toggle-pannel-container">
      <span className="tool-panel-trigger">
        <i
          className="iconfont icon-menu"
          onClick={() => {
            setVisible(!visible);
          }}
        ></i>
      </span>
      <BottomPanel show={visible} onHide={() => setVisible(false)}>
        <div className="tool-panel-container">{title}</div>
        <div className="main">
          {list.map((item, index) => (
            <div
              className="tool-item"
              key={index}
              onClick={() => {
                onSelectItem(item);
              }}
            >
              <i className={"iconfont " + item.icon}></i>
              <span className="text">{item.text}</span>
            </div>
          ))}
        </div>
      </BottomPanel>
    </div>
  );
};

export default ToolPanel;
