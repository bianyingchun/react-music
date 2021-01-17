import React, { useState } from "react";
import "./style.scss";
import BottomPanel from "../../widgets/BottomPanel";
interface ToolItem {
  icon: string;
  text: string;
  action: () => void;
}
interface ToolPanelProps {
  title: string;
  list: ToolItem[];
}
const ToolPanel: React.FC<ToolPanelProps> = ({ title, list }) => {
  const [visible, setVisible] = useState(false);
  function onSelectItem(item: ToolItem) {
    item.action();
    setVisible(false);
  }
  return (
    <div className="toggle-pannel-container">
      <span
        className="tool-panel-trigger"
        onClick={(e) => {
          setVisible(!visible);
        }}
      >
        <i className="iconfont icon-more"></i>
      </span>
      <BottomPanel show={visible} onHide={() => setVisible(false)}>
        <div className="tool-panel-container">
          <div className="header">{title}</div>
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
        </div>
      </BottomPanel>
    </div>
  );
};

export default ToolPanel;
