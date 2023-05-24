import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadMore } from './loadMore.js';
import { searchImages } from './searchImages.js';
import { hideBtnLoadMore } from './hideBtnLoadMore.js';

const form = document.getElementById('search-form');
export const gallery = document.querySelector('.gallery');
export const btnLoadMore = document.querySelector('.load-more');
export const lightbox = new SimpleLightbox('.gallery a');

form.style.backgroundColor = 'blue';
form.style.padding = '20px';
form.style.textAlign = 'center';
form.style.position = 'sticky';
form.style.margin = '0';
form.style.top = '-1px';
gallery.style.display = 'flex';
gallery.style.flexWrap = 'wrap';
gallery.style.justifyContent = 'center';
gallery.style.gap = '20px';
btnLoadMore.style.display = 'none';
btnLoadMore.style.margin = '0 auto';
btnLoadMore.style.marginTop = '20px';
btnLoadMore.style.padding = '15px 30px';
btnLoadMore.style.fontSize = '16px';
btnLoadMore.style.backgroundColor = 'blue';
btnLoadMore.style.border = 'none';
btnLoadMore.style.color = 'white';

let currentPage = 1;
let currentSearch = '';

form.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault();
  const search = event.target.elements.searchQuery.value.trim();
  if (search === '') {
    return;
  }
  currentSearch = search;
  currentPage = 1;
  gallery.innerHTML = '';
  searchImages(currentPage, currentSearch);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  hideBtnLoadMore();
}

btnLoadMore.addEventListener('click', loadMore);

// !------------------------scroll----------------

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
});

observer.observe(btnLoadMore);

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      searchImages(currentPage, currentSearch);
    }
  });
}

// !------------------------scroll----------------
