import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./style.scss";
interface BottomePanelProps {
  show: boolean;
  onHide: () => void;
  onRemove: () => void;
  theme: string;
}

class BottomPanel extends React.Component<BottomePanelProps> {
  node: HTMLDivElement;
  constructor(props: BottomePanelProps) {
    super(props);
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
  render() {
    return createPortal(
      <div
        className={["bottom-modal-wraper", "theme", this.props.theme].join(" ")}
      >
        <div
          className="mask"
          onClick={(e) => {
            this.props.onHide();
            e.stopPropagation();
          }}
        ></div>
        <CSSTransition
          classNames="slide-up"
          in={this.props.show}
          timeout={400}
          onExited={() => {
            this.props.onRemove();
          }}
        >
          <div
            className="bottom-modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {this.props.children}
          </div>
        </CSSTransition>
      </div>,
      this.node
    );
  }
}

interface Props {
  show: boolean;
  onHide: () => void;
}
const BottomPanelContainer: React.FC<Props> = ({ show, onHide, children }) => {
  const [visible, setVisible] = useState(show);
  const theme = useSelector((state: RootState) => state.system.theme.current);
  if (visible !== show) {
    setVisible(show);
  }
  if (!visible) return null;
  return (
    <BottomPanel
      onHide={onHide}
      show={show}
      children={children}
      onRemove={() => setVisible(false)}
      theme={theme}
    />
  );
};

export default BottomPanelContainer;
