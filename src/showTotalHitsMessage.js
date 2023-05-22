import { Notify } from 'notiflix';

export function showTotalHitsMessage(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
