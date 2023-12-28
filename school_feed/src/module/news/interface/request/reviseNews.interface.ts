import { CreateNewsReqInterface } from './createNews.interface';

export interface ReviseNewsReqInterface extends CreateNewsReqInterface {
  newsIndex: string;
}
