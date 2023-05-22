import { Notify } from 'notiflix';

export function showMessageNoImages() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
