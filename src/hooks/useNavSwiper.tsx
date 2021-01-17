import React, { useState, useMemo, useCallback } from "react";

interface NavItem {
  name: string;
  [prop: string]: any;
}
export const useNavSwiper = (list: NavItem[], initIndex = 0) => {
  const [navIndex, setNavIndex] = useState(initIndex);
  const [swiper, setSwiper] = useState<any>(null);
  function onSlideChange(swiper: any) {
    setNavIndex(swiper.activeIndex);
  }
  const toggleTab = useCallback(
    (index: number) => {
      setNavIndex(index);
      swiper.slideTo(index, 0, false);
    },
    [swiper]
  );
  const NavList = useMemo(() => {
    return (
      <div className="nav-container">
        <div className="nav-list">
          {list.map((item, index) => (
            <div
              className={index === navIndex ? "nav-item active" : "nav-item"}
              key={index}
              onClick={() => toggleTab(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }, [list, navIndex, toggleTab]);

  return {
    NavList,
    setSwiper,
    onSlideChange,
    navIndex,
  };
};
