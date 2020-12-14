import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Modal from "../../widgets/Modal";

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
      <Modal onClose={this.onClose}>
        {this.props.renderChildren(this.onClose)}
      </Modal>
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
