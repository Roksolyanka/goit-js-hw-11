import { showImages } from './showImages.js';
import { addImages } from './addImages.js';
import { showTotalHitsMessage } from './showTotalHitsMessage.js';
import { showMessageNoImages } from './showMessageNoImages.js';
import { showMessageEnd } from './showMessageEnd.js';
import { showErrorMessage } from './showErrorMessage.js';
import { showBtnLoadMore } from './showBtnLoadMore.js';
import { hideBtnLoadMore } from './hideBtnLoadMore.js';
import axios from 'axios';

export async function searchImages(currentPage, currentSearch) {
  const apiKey = '36422452-9b888b62de5b5be2dbb1e9e04';
  const perPage = 40;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${currentSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const images = response.data.hits;
    const totalHits = response.data.totalHits;

    if (images.length === 0) {
      showMessageNoImages();
    } else {
      if (currentPage === 1) {
        showImages(images);
        showTotalHitsMessage(totalHits);
      } else {
        addImages(images);
      }

      if (images.length < perPage || currentPage * perPage >= totalHits) {
        hideBtnLoadMore();
        showMessageEnd();
      } else {
        showBtnLoadMore();
      }
    }
  } catch (error) {
    console.error('Error:', error);
    showErrorMessage();
  }
}
