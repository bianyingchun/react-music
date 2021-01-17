import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import BottomPanel from "../../widgets/BottomPanel";
import { addPlaylist } from "src/store/actions/playlist";
import { useInputValue, useCheckBox } from "src/hooks/shared";
const AddMix: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const name = useInputValue("");
  const privacy = useCheckBox(false);
  const submit = () => {
    dispatch(addPlaylist(name.value, privacy.checked));
    setVisible(false);
  };
  return (
    <>
      <span className="create-playlist-trigger">
        <i className="iconfont icon-add" onClick={() => setVisible(true)}></i>
      </span>
      <BottomPanel show={visible} onHide={() => setVisible(false)}>
        <div className="create-playlist-container">
          <div className="btns">
            <button type="button" onClick={() => setVisible(false)}>
              取消
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!name.value || name.value.length > 40}
            >
              完成
            </button>
          </div>
          <h3 className="title">新建歌单</h3>
          <input
            type="text"
            placeholder="请输入新歌单标题"
            maxLength={40}
            {...name}
            className="input-box"
          />
          <div className="toggle-privacy">
            <div className="checkbox-view">
              <span className="state">
                {privacy.checked && <i className="iconfont icon-selected"></i>}
              </span>
              <span className="text">设置为隐私歌单</span>
            </div>
            <input type="checkbox" {...privacy} name="privacy" />
          </div>
        </div>
      </BottomPanel>
    </>
  );
};

export default AddMix;
