import React from 'react';
import EpisodeRow from './EpisodeRow';
import { EpisodeExtended } from '../models';
import EpisodeDialog from './EpisodeDialog';
import List from '@material-ui/core/List';

interface Props {
  episodes: EpisodeExtended[];
  listType: 'playlist' | 'podcast';
  onStream: (episode: EpisodeExtended) => void;
}

interface State {
  selectedEpisode?: EpisodeExtended;
}

class EpisodeList extends React.Component<Props, State> {
  state: State = {};

  setSelectedEpisode = (episode: EpisodeExtended) => () => {
    this.setState({ selectedEpisode: episode });
  };

  clearSelectedEpisode = () => {
    this.setState({ selectedEpisode: undefined });
  };

  handleStream = () => {
    this.clearSelectedEpisode();
    this.props.onStream(this.state.selectedEpisode!);
  };

  getListItemFields = (episode: EpisodeExtended) => {
    const fields: any = {};

    switch (this.props.listType) {
      case 'playlist':
        fields.avatar = episode.cover[60];
        fields.primary = episode.title;
        fields.secondary = episode.subTitle;
        break;
      default:
        fields.primary = episode.title;
        fields.secondary = episode.subTitle;
        break;
    }

    return fields;
  };

  render() {
    const { episodes } = this.props;

    if (!episodes || episodes.length === 0) return null;

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
          episode={this.state.selectedEpisode as EpisodeExtended}
          open={!!this.state.selectedEpisode}
          onClose={this.clearSelectedEpisode}
          onStream={this.handleStream}
        />
      </React.Fragment>
    );
  }
}

export default EpisodeList;
