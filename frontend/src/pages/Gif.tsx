import React, { useEffect, useState } from 'react';
import Video from '../components/video';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveVideo } from '../store/videoReducer';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

function Pagee({ videoUrl, playbackPosition, startAt, setPlaybackPosition }: any) {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const diffPerSec = new Date().getTime() - Number(startAt);
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
            setPlaybackPosition(diffPerSec);
            dispatch(
              saveVideo({
                videoUrl: videoUrl,
                playbackPosition: playbackPosition
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
