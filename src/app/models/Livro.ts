import { ImagemLinks } from "./ImagemLinks";

export interface Livro {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: ImagemLinks;
}
