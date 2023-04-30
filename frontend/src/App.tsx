import YouTube, { YouTubeProps } from 'react-youtube';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { saveVideo } from './store/videoReducer';
import Video from './components/video';
import { HomePage, GifPage } from './pages';
import { AppDispatch, RootState } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';
function App() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const video = useSelector((state: RootState) => state.video);
  const videoUrlFromStore = video?.videoUrl;
  const [videoUrl, setVideoUrl] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startAt, setStartAt] = useState('');
  const [playbackPosition, setPlaybackPosition] = useState('');
  const navigate = useNavigate();
  const onPlayerReady = async (event: any) => {
    await event.target.playVideo();

    await dispatchSaveVideo();
  };

  const dispatchSaveVideo = async () => {
    await dispatch(
      saveVideo({
        videoUrl: videoUrl,
        playbackPosition: playbackPosition
      })
    );
  };
  const onSaveVideo = async (e: React.FormEvent) => {
    if (formSubmitted && videoUrlFromStore !== videoUrl) {
      setPlaybackPosition('');
      setFormSubmitted(false);
    }
    e.preventDefault();
    await dispatchSaveVideo();
    setFormSubmitted(true);
  };

  const navigateToGif = async (e: any) => {
    await dispatchSaveVideo();
    navigate('/home');
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    onSaveVideo(e);
  };
  useEffect(() => {
    dispatchSaveVideo();
  }, [playbackPosition]);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              navigate={navigateToGif}
              onSubmit={onSubmit}
              onPlayerReady={onPlayerReady}
              setStartAt={setStartAt}
              playbackPosition={playbackPosition}
              formSubmitted={formSubmitted}
            />
          }
        />
        <Route
          path='/home'
          element={
            <GifPage
              videoUrl={videoUrl}
              playbackPosition={playbackPosition}
              startAt={startAt}
              setPlaybackPosition={setPlaybackPosition}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
