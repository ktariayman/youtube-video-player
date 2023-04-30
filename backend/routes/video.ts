import router from 'express';
import { Video } from '../types';

const videoRouter = router.Router();
import express, { Application, Request, Response } from 'express';
import { db } from '../store/index';

videoRouter.post('/', (req: Request, res: Response) => {
  const { videoUrl, playbackPosition } = req.body;
  if (!videoUrl) return res.status(400).send('Please provide complete information');

  const videoExist = db.getVideo(videoUrl);

  if (!videoExist) {
    return res.send(db.saveVideo({ videoUrl, playbackPosition }));
  } else {
    return res.send(db.updateVideo({ videoUrl, playbackPosition }));
  }
});

videoRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send(db.getVideos());
});

videoRouter.get('/:videoUrl', (req: Request, res: Response) => {
  const { videoUrl } = req.params;
  if (!videoUrl) {
    return res.status(400).send('Please provide a video URL');
  }
  return res.status(200).send(db.getVideo(videoUrl));
});

videoRouter.put('/:videoUrl', (req: Request, res: Response) => {
  return res.status(200).send(db.getVideos());
});

export default videoRouter;
