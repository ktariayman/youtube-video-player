import YouTube, { YouTubeProps } from 'react-youtube';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { saveVideo } from './store/videoReducer';
import Video from './components/video';
import { HomePage, GifPage } from './pages';
import axios from './axios';
function App() {
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [replayAt, setReplayAt] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [isReplayed, setIsReplayed] = useState(false);
  const navigate = useNavigate();
  const onPlayerReady = async (event: any) => {
    if (replayAt === '') {
      await event.target.playVideo();
      const date = new Date().getTime();
      setStartAt(date.toString());
      setVideoDuration(event.target.getDuration());
      setEndAt(String(date + Math.floor(Number(event.target.getDuration()) + 1)));
      await saveVideoApi();
    } else if (!isReplayed) {
      setIsReplayed(true);
      await event.target.seekTo((+replayAt - +startAt) / 1000);
    }
  };
  const saveVideoApi = async () => {
    const url = 'http://localhost:5000/videos';
    await axios
      .post(url, {
        videoUrl: videoUrl,
        startAt: startAt,
        endAt: endAt,
        replayAt: replayAt
      })
      .then((response) => console.log('response', response));
  };
  const onSaveVideo = async (e: any) => {
    dispatch(
      saveVideo({
        videoUrl: videoUrl,
        startAt: startAt,
        endAt: endAt,
        replayAt: replayAt
      })
    );
    setFormSubmitted(true);
  };

  const navigateToGif = async (e: any) => {
    await setReplayAt(new Date().getTime().toString());
    setIsReplayed(false);
    dispatch(
      saveVideo({
        videoUrl: videoUrl,
        startAt: startAt,
        endAt: endAt,
        replayAt: replayAt
      })
    );
    navigate('/home');
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    onSaveVideo(e);
  };
  useEffect(() => {
    if (startAt && endAt && videoUrl) {
      dispatch(
        saveVideo({
          videoUrl: videoUrl,
          startAt: startAt,
          endAt: endAt,
          replayAt: replayAt
        })
      );
    }
  }, [videoDuration]);

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
              formSubmitted={formSubmitted}
            />
          }
        />
        <Route
          path='/home'
          element={
            <GifPage
              videoUrl={videoUrl}
              startAt={startAt}
              endAt={endAt}
              replayAt={replayAt}
              setReplayAt={setReplayAt}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
