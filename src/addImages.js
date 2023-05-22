import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createCard } from './createCard.js';

export async function addImages(images) {
  const gallery = document.querySelector('.gallery');
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
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
