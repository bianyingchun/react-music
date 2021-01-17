import React from "react";
import "./style.scss";
interface ProgressCircleProps {
  radius?: number;
  percent: number;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const ProgressCircle: React.FC<ProgressCircleProps> = ({
  radius = 100,
  percent = 0,
  children,
  onClick,
}) => {
  const dashArray = Math.PI * 100;
  return (
    <div
      className="progress-circle"
      onClick={(e) => {
        onClick(e);
      }}
    >
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={1 - percent * dashArray}
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressCircle;
