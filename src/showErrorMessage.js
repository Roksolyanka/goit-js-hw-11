import { Notify } from 'notiflix';

export function showErrorMessage() {
  Notify.failure(
    'Error',
    'An error occurred while fetching the images. Please try again later.'
  );
}
