import { Video } from '../types';
export interface VideoDao {
  saveVideo(video: Video): void;
  getVideo(url: string): Video | undefined;
  getVideos(): Video[] | undefined;
}
