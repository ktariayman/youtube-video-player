import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { VideoState, saveVideo } from '../store/videoReducer';
import YouTube, { YouTubeProps } from 'react-youtube';
function Video({ onPlayerReady, playbackPosition, formSubmitted }: any) {
  const { videoUrl } = useSelector((state: RootState) => state.video);

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      start: Math.floor(+playbackPosition / 1000),
      controls: 0
    }
  };
  const videoId = videoUrl?.split('=')[1];

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
