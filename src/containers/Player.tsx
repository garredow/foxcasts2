import React, { SyntheticEvent, useContext, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AudioPlayer from 'react-audio-player';
import PodcastService from '../services/podcastService';
import { EpisodeExtended } from '../models';
import MiniPlayer from '../components/MiniPlayer';
import FullPlayer from '../components/FullPlayer';
import { Typography } from '@material-ui/core';
import SettingsContext from '../components/SettingsContext';
import { makeStyles } from '@material-ui/styles';

const podcastService = new PodcastService();

const useStyles = makeStyles({
  backdrop: {
    background: 'red',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(50px)',
    opacity: 0.2,
    zIndex: -1,
  },
  episodeTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

type PlayerProps = {
  episode?: EpisodeExtended;
  onStopPlayback: () => void;
  fullPlayerOpen?: boolean;
  onCloseFulllPlayer: () => void;
};

function Player(props: PlayerProps) {
  const { episode } = props;
  if (!episode) return null;

  const context = useContext(SettingsContext);
  const classes = useStyles();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSmallPlayer, setIsSmallPlayer] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  let audioRef: any;

  useEffect(() => {
    if (!episode) return;

    audioRef.audioEl.currentTime = episode.progress;

    setIsPlaying(true);
    setIsSmallPlayer(true);
    setProgress(episode.progress);
    setDuration(episode.duration);

    handleTogglePlaying();
  }, [episode]);

  const resetPlayerState = () => {
    setIsPlaying(true);
    setIsSmallPlayer(false);
    setProgress(0);
    setDuration(0);
  };

  const handleTogglePlaying = (ev?: MouseEvent) => {
    if (ev) {
      ev.stopPropagation();
    }

    const playing = !isPlaying;
    setIsPlaying(playing);
    playing ? audioRef.audioEl.play() : audioRef.audioEl.pause();
  };

  const handleCloseEpisode = () => {
    resetPlayerState();
    props.onStopPlayback();
  };

  const openFullView = () => {
    setIsSmallPlayer(false);
  };

  const onCloseFullPlayer = () => {
    setIsSmallPlayer(true);
    if (props.onCloseFulllPlayer) {
      props.onCloseFulllPlayer();
    }
  };

  const handleProgressChanged = (newProgress: number) => {
    if (!episode) return;

    newProgress = Math.ceil(newProgress);
    podcastService.updateEpisode(episode.id, { progress: newProgress });

    setProgress(newProgress);
  };

  const handleLoadedMetadata = (ev: SyntheticEvent<HTMLAudioElement>) => {
    if (!episode) return;

    const newProgress = episode.progress || 0;
    const newDuration = Math.ceil(ev.currentTarget.duration);

    if (newDuration !== episode.duration) {
      podcastService.updateEpisode(episode.id, { duration: newDuration });
    }

    setProgress(newProgress);
    setDuration(newDuration);
  };

  const handleEpisodeEnded = () => {
    if (!episode) return;

    const newProgress = episode.duration;

    setProgress(newProgress);
    setIsPlaying(false);

    audioRef.audioEl.pause();
    podcastService.updateEpisode(episode.id, { progress: newProgress });
  };

  const handleSeek = (newTime: number) => {
    setProgress(newTime);
    audioRef.audioEl.currentTime = newTime;
  };

  return (
    <React.Fragment>
      {context.navLayout !== 'bottom' && isSmallPlayer && (
        <MiniPlayer
          episode={episode}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onClick={openFullView}
          onTogglePlaying={handleTogglePlaying}
        />
      )}
      <Dialog
        fullScreen
        open={!isSmallPlayer || props.fullPlayerOpen === true}
        onClose={onCloseFullPlayer}
        TransitionComponent={Transition}
        classes={{ paper: 'dialog-background' }}
      >
        <div
          style={{ backgroundImage: `url('${episode.cover[600]}')` }}
          className={classes.backdrop}
        />
        <Toolbar>
          <IconButton onClick={onCloseFullPlayer}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.episodeTitle}>
            {episode.title}
          </Typography>
        </Toolbar>
        {(!isSmallPlayer || props.fullPlayerOpen) && (
          <FullPlayer
            episode={episode}
            isPlaying={isPlaying}
            progress={progress}
            duration={duration}
            onCloseEpisode={handleCloseEpisode}
            onSeek={handleSeek}
            onTogglePlaying={handleTogglePlaying}
          />
        )}
      </Dialog>
      <AudioPlayer
        listenInterval={1000}
        onListen={handleProgressChanged}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEpisodeEnded}
        src={episode.fileUrl}
        ref={(element: any) => {
          audioRef = element;
        }}
      />
    </React.Fragment>
  );
}

export default Player;
