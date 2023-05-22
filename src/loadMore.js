import { searchImages } from './searchImages.js';

export function loadMore() {
  currentPage += 1;
  searchImages(currentPage, currentSearch);
}
