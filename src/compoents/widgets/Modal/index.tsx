import React from "react";
import "./style.scss";

interface ModalProps {
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-wraper">
      <div
        className="mask"
        onClick={(e) => {
          onClose();
          e.stopPropagation();
        }}
      >
        <div className="content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
