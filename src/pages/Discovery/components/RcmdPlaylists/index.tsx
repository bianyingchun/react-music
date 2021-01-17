import React from "react";
import "./style.scss";
import MixItem from "src/compoents/achive/MixItem";
import { Mix } from "src/types";

interface Props {
  list: Mix[];
}

const RcmdPlaylit: React.FC<Props> = ({ list }) => {
  return (
    <div className="rcmd-mix-list">
      {list.map((item) => (
        <MixItem key={item.id} mix={item}></MixItem>
      ))}
    </div>
  );
};

export default RcmdPlaylit;
