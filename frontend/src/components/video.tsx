import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { VideoState, saveVideo } from '../store/videoReducer';
import YouTube, { YouTubeProps } from 'react-youtube';

function Video({ formSubmitted, onPlayerReady }: any) {
  const { videoUrl } = useSelector((state: RootState) => state.video);

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  const videoId = videoUrl.split('=')[1];
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}
    >
      {formSubmitted && videoUrl && (
        <YouTube
          videoId={videoId}
          onPlay={onPlayerReady}
          opts={opts}
        />
      )}
    </div>
  );
}

export default Video;
