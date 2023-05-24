import { createCard } from './createCard.js';
import { gallery } from './index.js';
import { lightbox } from './index.js';

export async function addImages(images) {
  for (const image of images) {
    const imageCard = createCard(image);
    gallery.appendChild(imageCard);
  }

  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  
  lightbox.refresh();
}
