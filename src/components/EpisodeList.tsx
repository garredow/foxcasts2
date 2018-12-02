import React from 'react';
import EpisodeRow from './EpisodeRow';
import { EpisodeExtended } from '../models';
import EpisodeDialog from './EpisodeDialog';
import List from '@material-ui/core/List';

type EpisodeListProps = {
  episodes: EpisodeExtended[];
  listType: 'playlist' | 'podcast';
  onStream: (episode: EpisodeExtended) => void;
  onTogglePlayed: (episodeId: number) => void;
};

type EpisodeListState = {
  selectedEpisode?: EpisodeExtended;
};

class EpisodeList extends React.Component<EpisodeListProps, EpisodeListState> {
  state: EpisodeListState = {};

  setSelectedEpisode = (episode: EpisodeExtended) => () => {
    this.setState({ selectedEpisode: episode });
  };

  clearSelectedEpisode = () => {
    this.setState({ selectedEpisode: undefined });
  };

  handleResume = () => {
    this.clearSelectedEpisode();
    this.props.onStream(this.state.selectedEpisode!);
  };

  handlePlayFromBeginning = () => {
    this.clearSelectedEpisode();
    const episode = { ...this.state.selectedEpisode } as EpisodeExtended;
    episode.progress = 0;

    this.props.onStream(episode);
  };

  handleTogglePlayed = (ev: any) => {
    if (!this.state.selectedEpisode) return;

    this.props.onTogglePlayed(this.state.selectedEpisode.id);
  };

  getListItemFields = (episode: EpisodeExtended) => {
    const fields: any = {};

    switch (this.props.listType) {
      case 'playlist':
        fields.avatar = episode.cover[60];
        fields.primary = episode.title;
        fields.secondary = episode.subTitle;
        fields.isPlayed = episode.progress >= episode.duration;
        break;
      default:
        fields.primary = episode.title;
        fields.secondary = episode.subTitle;
        fields.isPlayed = episode.progress >= episode.duration;
        break;
    }

    return fields;
  };

  render() {
    const { episodes } = this.props;

    if (!episodes || episodes.length === 0) return null;

    const selectedEpisode = this.state.selectedEpisode
      ? this.props.episodes.find(e => e.id === (this.state.selectedEpisode as EpisodeExtended).id)
      : null;

    return (
      <React.Fragment>
        <List>
          {episodes.map(episode => (
            <EpisodeRow
              {...this.getListItemFields(episode)}
              onClick={this.setSelectedEpisode(episode)}
              key={episode.id}
            />
          ))}
        </List>
        <EpisodeDialog
          episode={selectedEpisode as EpisodeExtended}
          open={!!this.state.selectedEpisode}
          onClose={this.clearSelectedEpisode}
          onResume={this.handleResume}
          onPlayFromBeginning={this.handlePlayFromBeginning}
          onTogglePlayed={this.handleTogglePlayed}
        />
      </React.Fragment>
    );
  }
}

export default EpisodeList;
