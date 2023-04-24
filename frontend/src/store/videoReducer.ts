import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface VideoState {
  videoUrl: string;
  startAt: string;
  endAt: string;
  replayAt?: string;
}
const initialState: VideoState = {
  videoUrl: '',
  startAt: '',
  endAt: ''
};

export const videoReducer = createSlice({
  name: 'video',
  initialState,
  reducers: {
    saveVideo: (state, action: PayloadAction<VideoState>) => {
      state.videoUrl = action.payload.videoUrl;
      state.startAt = action.payload.startAt;
      state.endAt = action.payload.endAt;
      state.replayAt = action.payload.replayAt;
    }
  }
});

export const { saveVideo } = videoReducer.actions;

export const videoUrl = (state: RootState) => state.video.videoUrl;

export default videoReducer.reducer;
