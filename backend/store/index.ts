import { VideoDao } from './VideoDao';
import { InMemoryDatastore } from './memorydb';
export interface Datastore extends VideoDao {}
export const db = new InMemoryDatastore();
