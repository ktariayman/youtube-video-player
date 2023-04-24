import React from 'react';
import Video from '../components/video';
import './style.css';
function Home({ videoUrl, setVideoUrl, formSubmitted, onPlayerReady, onSubmit, navigate }: any) {
  return (
    <>
      <header className='header'>
        <div className='left-section'>
          <i className='material-icons'>menu </i>
          <img src='https://th.bing.com/th/id/R.fc6b4636e175bf082bcc045a524c3e77?rik=WRACpWOD9N2Lzw&pid=ImgRaw&r=0' />
        </div>
        <div className='mid-section'>
          <form>
            <label>YouTube Video URL</label>
            <input
              type='text'
              placeholder='youtube url'
              value={videoUrl}
              onChange={(e: any) => {
                e.preventDefault();
                setVideoUrl(e.target.value);
              }}
            />

            <button
              type='button'
              onClick={onSubmit}
            >
              click
            </button>
            <button
              type='button'
              onClick={navigate}
            >
              Gif
            </button>
          </form>
        </div>
      </header>
      {formSubmitted && (
        <Video
          formSubmitted={formSubmitted}
          onPlayerReady={onPlayerReady}
        />
      )}
    </>
  );
}

export default Home;
