import config from "./config.json";

export interface PicData {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

export interface PixResponse {
  total: number;
  totalHits: number;
  hits: Array<PicData>;
}

const { orientation, per_page, key } = config.pixabay;

export default async function getPics(
  query: string,
  page = 1
): Promise<PixResponse> {
  const f = await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=${orientation}&q=${query}&page=${page}&per_page=${per_page}&key=${key}`
  );
  if (!f.ok) throw new Error("Invalid data!");
  const data = await f.json();
  return data;
}
