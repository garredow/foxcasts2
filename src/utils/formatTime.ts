const formatTime = (rawSeconds: number) => {
  const hours = Math.floor(rawSeconds / 60 / 60);
  const minutes = Math.floor((rawSeconds / 60) % 60);
  const seconds = Math.floor(rawSeconds % 60);

  let time = '';
  time += hours > 0 ? hours.toString() + ':' : '';
  time += minutes > 0 ? minutes.toString().padStart(2, '0') + ':' : '0:';
  time += seconds.toString().padStart(2, '0');

  return time;
};

export default formatTime;
