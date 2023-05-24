import { createCard } from './createCard.js';
import { gallery } from './index.js';
import { lightbox } from './index.js';

export async function showImages(images) {
  gallery.innerHTML = '';

  for (const image of images) {
    const imageCard = createCard(image);
    gallery.appendChild(imageCard);
  }

  lightbox.refresh();
}
