import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";
import { useMyPlaylist, usePlaylist } from "src/hooks/usePlaylist";
import "./style.scss";
import MixItem from "src/compoents/achive/TinyMixItem";
import { Playlist } from "src/types";
import ToolPanel from "src/compoents/achive/toolPanel";
import AddMix from "src/compoents/achive/AddMix";
import AccountBox from "src/compoents/achive/AccountBox";
interface MixListProps {
  list: Playlist[];
  addBtn?: React.ReactNode;
  title: string;
  onEdit?: (mix: Playlist) => void;
  onDelete: (mix: Playlist) => void;
}
const MixList: React.FC<MixListProps> = ({
  list,
  addBtn,
  title,
  onEdit,
  onDelete,
}) => {
  const getTools = (playlist: Playlist) => {
    const list = [];
    if (onEdit) {
      list.push({
        icon: "icon-edit",
        text: "编辑歌单",
        action() {
          onEdit(playlist);
        },
      });
    }
    list.push({
      icon: "icon-delete",
      text: "删除",
      action() {
        onDelete(playlist);
      },
    });
    return list;
  };
  return (
    <div className="module-container mix-list-container">
      <div className="mix-list-header">
        <span className="title">{title}</span>
        <div className="tools">{addBtn ? addBtn : null}</div>
      </div>
      <div className="mix-list">
        {list.map((item) => (
          <MixItem mix={item} key={item.id}>
            <ToolPanel title={item.name} list={getTools(item)}></ToolPanel>
          </MixItem>
        ))}
      </div>
    </div>
  );
};

const Mine = () => {
  const { mine, deletePlaylist } = useMyPlaylist();
  const { toggleSubscribePlaylist } = usePlaylist();
  const { profile, toggleLoginBox } = useAuth();
  return (
    <div className="mine-page-container">
      <AccountBox profile={profile} toggleLoginBox={toggleLoginBox} />
      {!!mine.likelist && <MixItem mix={mine.likelist}></MixItem>}
      <MixList
        list={mine.created}
        title={`创建歌单(${mine.created.length})`}
        onDelete={(mix) => deletePlaylist(mix.id)}
        onEdit={(mix) => console.log("编辑" + mix.id)}
        addBtn={<AddMix></AddMix>}
      ></MixList>
      <MixList
        list={mine.faved}
        title={`收藏歌单(${mine.faved.length})`}
        onDelete={(mix) => toggleSubscribePlaylist(mix)}
      ></MixList>
    </div>
  );
};
export default Mine;
