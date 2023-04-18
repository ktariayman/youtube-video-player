import router from 'express';
import { Video } from '../types';

const videoRouter = router.Router();
import express, { Application, Request, Response } from 'express';
import { db } from '../store/index';

videoRouter.post('/', (req: Request, res: Response) => {
  const { videoUrl, playbackPosition } = req.body;
  if (!videoUrl || !playbackPosition)
    return res.status(400).send('Please provide complete information');

  return res.send(db.saveVideo({ videoUrl, playbackPosition }));
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
videoRouter.patch('/:videoUrl', (req: Request, res: Response) => {
  const videoDetails = db.getVideo(req.body.videoUrl);
  if (!videoDetails) {
    return res.status(400).send('Please enter a URL saved in the database');
  }
  console.log('req.body', req.body);

  videoDetails.playbackPosition = req.body.playbackPosition;
  return res.send({ videoDetails });
});
export default videoRouter;
