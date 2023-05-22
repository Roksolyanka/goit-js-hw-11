import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createCard } from './createCard.js';

export async function showImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  for (const image of images) {
    const imageCard = createCard(image);
    gallery.appendChild(imageCard);
  }

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}