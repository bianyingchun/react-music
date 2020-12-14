import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.scss";

interface BottomPanelProps {
  show: boolean;
  onHide: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({
  show,
  onHide,
  children,
}) => {
  const [visible, setVisible] = useState(show);
  setVisible(show);
  return (
    <div
      className="modal-wraper"
      style={{ display: visible ? "block" : "none" }}
    >
      <div
        className="mask"
        style={{ display: show ? "block" : "none" }}
        onClick={(e) => {
          onHide();
          e.stopPropagation();
        }}
      ></div>
      <CSSTransition
        classNames="slide-up"
        in={show}
        timeout={400}
        onExited={() => {
          setVisible(false);
        }}
      >
        {show && (
          <div
            className="content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        )}
      </CSSTransition>
    </div>
  );
};

export default BottomPanel;
