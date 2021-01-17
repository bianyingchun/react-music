import React from "react";
import "./style.scss";
import { useTheme } from "src/hooks/useTheme";
interface ModalProps {
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const { theme } = useTheme();
  return (
    <div className={"modal-wraper theme " + theme}>
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
