import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type LoadingProps = {
  error: Error;
  retry: (ev: any) => void;
  pastDelay: boolean;
};

const Loading = (props: LoadingProps) => {
  if (props.error) {
    return (
      <div>
        <Typography>Error!</Typography>
        <Button color="secondary" onClick={props.retry}>
          Retry
        </Button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Typography>Loading...</Typography>;
  } else {
    return null;
  }
};

export default Loading;
