import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
const progressBtnWidth = 16;
interface ProgressBarProps {
  percent: number;
  cachePercent?: number;
  onChange: (value: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  onChange,
  cachePercent = 0,
}) => {
  const container = useRef<null | HTMLDivElement>(null);
  const progress = useRef<null | HTMLDivElement>(null);
  const touch = useRef({
    initialed: false,
    starX: 0,
    left: 0,
  });
  const [selfPer, setSelfPer] = useState(percent);
  const prevPercent = useRef(percent);
  if (percent !== selfPer && !touch.current.initialed) {
    setSelfPer(percent);
  }
  const barWidth = useRef(0);
  useEffect(() => {
    const el = container.current;
    if (el && barWidth.current <= 0) {
      barWidth.current = el.clientWidth - progressBtnWidth;
    }
    prevPercent.current = percent;
  });
  const progressWidth = useMemo(() => {
    return barWidth.current * selfPer;
  }, [selfPer, barWidth]);

  const cacheWidth = barWidth.current * cachePercent + progressBtnWidth;
  const progressClick = (e: React.MouseEvent) => {
    const el = container.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      onChange(offsetWidth / barWidth.current);
    }
    e.preventDefault();
  };
  const progressTouchStart = (e: React.TouchEvent) => {
    const el = progress.current;
    if (el) {
      touch.current.initialed = true;
      touch.current.starX = e.touches[0].pageX;
      touch.current.left = el.clientWidth;
    }
  };
  const progressTouchMove = (e: React.TouchEvent) => {
    if (!touch.current.initialed) return;
    const deltaX = e.touches[0].pageX - touch.current.starX;
    const width = Math.min(
      barWidth.current,
      Math.max(0, touch.current.left + deltaX)
    );
    setSelfPer(width / barWidth.current);
  };
  const progressTouchEnd = () => {
    touch.current.initialed = false;
    onChange(selfPer);
  };
  return (
    <div
      className="progress-bar"
      ref={container}
      onClick={(e) => progressClick(e)}
    >
      <div className="bar-inner">
        <div
          className="progress"
          ref={progress}
          style={{ width: `${progressWidth}px` }}
        ></div>
        <div
          className="progress cache"
          style={{ width: `${cacheWidth}px` }}
        ></div>
        <div
          className="progress-btn-wrapper"
          style={{ transform: `translate3d(${progressWidth}px, 0 , 0)` }}
          onTouchStart={(e) => progressTouchStart(e)}
          onTouchMove={(e) => progressTouchMove(e)}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
