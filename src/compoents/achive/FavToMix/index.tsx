import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import { useMyPlaylist } from "src/hooks/usePlaylist";
import BottomPanel from "src/compoents/widgets/BottomPanel";
import MixItem from "../TinyMixItem";
import { Playlist, Track } from "src/types";
import { Provider } from "react-redux";
import store from "src/store";
interface SelectMixProps {
  visible: boolean;
  hide: () => void;
  track?: Track;
}
const SelectMix: React.FC<SelectMixProps> = ({ visible, hide, track }) => {
  const { mine, addTrackToPlaylist } = useMyPlaylist();
  function onSelect(mix: Playlist) {
    hide();
    if (track) {
      addTrackToPlaylist(mix.id, track);
    }
  }
  const list = mine.likelist ? [mine.likelist, ...mine.created] : mine.created;
  return (
    <BottomPanel show={visible} onHide={hide}>
      <div className="fav-to-mix-container">
        <div className="header">收藏到歌单</div>
        <div className="mix-list">
          {list.map((item) => (
            <MixItem
              key={item.id}
              onSelect={() => onSelect(item)}
              mix={item}
            ></MixItem>
          ))}
        </div>
      </div>
    </BottomPanel>
  );
};

interface Props {}
interface State {
  visible: boolean;
  track?: Track;
}
class FavToMix extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.hide = this.hide.bind(this);
  }
  hide() {
    this.setState({ visible: false });
  }
  setTrack(track: Track) {
    this.setState({
      track,
      visible: true,
    });
  }
  render() {
    return (
      <Provider store={store}>
        <SelectMix
          visible={this.state.visible}
          hide={this.hide}
          track={this.state.track}
        ></SelectMix>
      </Provider>
    );
  }
}

let instance: any;
export function favTrackToMix(track: Track) {
  if (!instance) {
    const div = document.createElement("div");
    document.body.appendChild(div);
    instance = React.createRef<FavToMix>();
    ReactDOM.render(<FavToMix ref={instance} />, div);
  } else {
    instance.current.setTrack(track);
  }
}
