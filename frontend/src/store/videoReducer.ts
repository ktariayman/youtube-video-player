import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import axios from 'axios';

export interface VideoState {
  videoUrl: string;
  playbackPosition: string;
}

const initialState: VideoState = {
  videoUrl: '',
  playbackPosition: ''
};

export const saveVideo = createAsyncThunk(
  'video/saveVideo',
  async ({ videoUrl, playbackPosition }: VideoState) => {
    const response = await axios.post('http://localhost:5000/videos', {
      videoUrl,
      playbackPosition
    });
    return response.data;
  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveVideo.fulfilled, (state, action) => {
      state.videoUrl = action.meta.arg.videoUrl;
      state.playbackPosition = action.meta.arg.playbackPosition;
    });
  }
});

export const selectVideoUrl = (state: RootState) => state.video.videoUrl;

export default videoSlice.reducer;
