import { Datastore } from '../';
import { Video } from '../../types';
export class InMemoryDatastore implements Datastore {
  private videos: Video[] = [];
  saveVideo(video: Video): void {
    this.videos.push(video);
  }
  getVideo(url: string): Video | undefined {
    return this.videos.find((v) => v.videoUrl === url);
  }
  getVideos(): Video[] | undefined {
    return this.videos;
  }
}
