import { ImagemLinks } from "./ImagemLinks";

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: ImagemLinks;
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
