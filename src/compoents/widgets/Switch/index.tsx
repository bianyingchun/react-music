import React from "react";
import "./style.scss";
interface Props {
  value: boolean;
  onChange?: (value: boolean) => void;
}

const Switch: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div
      className={"switch " + (value ? "on" : "off")}
      onClick={() => {
        onChange && onChange(!value);
      }}
    >
      <span className="switch-btn"></span>
    </div>
  );
};

export default Switch;
