import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Modal from "../Modal";
import { Provider } from "react-redux";
import store from "src/store";
interface DialogProps {
  remove: () => void;
  renderChildren: (close: () => void) => React.ReactNode;
}
interface DialogState {
  visible: boolean;
}
class Dialog extends React.Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    this.setState({ visible: false });
    this.props.remove();
  }
  render() {
    return (
      <Provider store={store}>
        <Modal onClose={this.onClose}>
          {this.props.renderChildren(this.onClose)}
        </Modal>
      </Provider>
    );
  }
}

export function popupDialog(
  renderChildren: (close: () => void) => React.ReactNode
) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  function remove() {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }
  ReactDOM.render(
    <Dialog renderChildren={renderChildren} remove={remove} />,
    el
  );
}

export const confirm = (text: string) => {
  return new Promise((resolve, reject) => {
    popupDialog((close) => {
      return (
        <div className="confirm-dialog-container">
          <div className="text">
            <span>{text}</span>
          </div>
          <div className="btns">
            <span
              onClick={() => {
                close();
                reject();
              }}
              className="cancel"
            >
              取消
            </span>
            <span
              onClick={() => {
                close();
                resolve(true);
              }}
              className="ensure"
            >
              确定
            </span>
          </div>
        </div>
      );
    });
  });
};

export interface TipItem {
  title: string;
  action: () => void;
}
export const showToolTips = (list: TipItem[]) => {
  popupDialog((close) => {
    return (
      <div className="tool-tip-list">
        {list.map((item, index) => (
          <div
            className="tool-item"
            key={index}
            onClick={() => {
              close();
              item.action();
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  });
};
