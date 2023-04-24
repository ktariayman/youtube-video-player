import React, { useEffect, useState } from 'react';
import Video from '../components/video';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveVideo } from '../store/videoReducer';

function Pagee({ videoUrl, startAt, endAt, replayAt, setReplayAt }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='gif-page'>
      <div>
        <img src='https://media.tenor.com/4k-pgr5BZv4AAAAd/developer-programmer.gif' />
      </div>
      <div className='gif-button'>
        <button
          type='button'
          className='return-button'
          onClick={() => {
            setReplayAt(new Date().getTime().toString());
            dispatch(
              saveVideo({
                videoUrl: videoUrl,
                startAt: startAt,
                endAt: endAt,
                replayAt: replayAt
              })
            );
            navigate('/');
          }}
        >
          back to video
        </button>
      </div>
    </div>
  );
}

export default Pagee;
