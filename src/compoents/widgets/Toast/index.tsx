import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

interface Props {}
interface State {
  text: string;
  showContent: boolean;
  showWraper: boolean;
}
class Notice extends React.Component<Props, State> {
  toastWraperTimer: any = null;
  toastContentTimer: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
      showContent: false,
      showWraper: false,
    };
  }
  show(text: string, duration: number = 3000) {
    if (this.toastWraperTimer) clearTimeout(this.toastWraperTimer);
    if (this.toastContentTimer) clearTimeout(this.toastContentTimer);
    this.setState({
      text,
      showWraper: true,
      showContent: true,
    });

    this.toastWraperTimer = setTimeout(() => {
      this.setState({
        showWraper: false,
      });
    }, duration);

    this.toastContentTimer = setTimeout(() => {
      this.setState({
        showContent: false,
      });
    }, duration - 1250);
  }
  render() {
    return (
      <div
        style={{ display: this.state.showWraper ? "block" : "none" }}
        className={
          this.state.showContent
            ? "toast-wraper dark fadein"
            : "toast-wraper fadeout"
        }
      >
        {this.state.text}
      </div>
    );
  }
}

interface Notification {
  show: (text: string, duration?: number) => void;
  destroy: () => void;
}
function createNotification(): Notification {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const ref = React.createRef<Notice>();
  ReactDOM.render(<Notice ref={ref} />, div);
  return {
    show(text: string, duration: number = 4000) {
      ref.current?.show(text, duration);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

let notification: Notification;

export function toast(text: string, duration?: number) {
  if (!notification) {
    notification = createNotification();
  }
  notification.show(text, duration);
}
