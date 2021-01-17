import React, { useEffect } from "react";
import "./style.scss";
import BottomPanel from "src/compoents/widgets/BottomPanel";
import { fetchHqTaglist } from "src/store/actions/playlist";
import { RootState } from "src/store";
import { useSelector, useDispatch } from "react-redux";
interface Props {
  show: boolean;
  currentTag: string;
  onHide: () => void;
  onSelectTag: (tag: string) => void;
}
const HqTagFilter: React.FC<Props> = ({
  show,
  currentTag,
  onHide,
  onSelectTag,
}) => {
  const hqTags = useSelector((state: RootState) => state.playlist.hqTags);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hqTags.length) {
      dispatch(fetchHqTaglist());
    }
  }, []);
  function onSelect(tag: string) {
    onSelectTag(tag);
    onHide();
  }
  return (
    <BottomPanel show={show} onHide={onHide}>
      <div className="hq-tag-container">
        <div className="hq-title">选择你喜欢的分类</div>
        <div
          className={"tag-item all" + (currentTag === "全部" ? " active" : "")}
        >
          全部歌单
        </div>
        <div className="hq-tag-list">
          {hqTags.map((item, index) => (
            <div
              onClick={() => onSelect(item.name)}
              className={
                "item tag-item" + (currentTag === item.name ? " active" : "")
              }
              key={index}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </BottomPanel>
  );
};

export default HqTagFilter;
