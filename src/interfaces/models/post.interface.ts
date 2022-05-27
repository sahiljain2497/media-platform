import { MediaType } from '@/enums/common';

export interface PostI {
  _id: string;
  title: string;
  description: string;
  platform: string;
  category: string;
  channel: string;
  user: string;
  isPublished: string;
  publishedAt: Date;
  tags: string[];
  media: MediaI[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaI {
  url: string;
  type: MediaType;
  versions: PhotoVersionI | VideoVersionsI | null;
}

export interface PhotoVersionI {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
}

export interface VideoVersionsI {
  poster: PhotoVersionI;
  small: string;
  medium: string;
  large: string;
}
