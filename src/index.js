import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

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
  searchImages();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  hideBtnLoadMore();
}

btnLoadMore.addEventListener('click', function () {
  currentPage += 1;
  searchImages();
});

function searchImages() {
  const apiKey = '36422452-9b888b62de5b5be2dbb1e9e04';
  const perPage = 40;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${currentSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`;

  axios
    .get(url)
    .then(response => {
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
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorMessage();
    });
}

function showImages(images) {
  gallery.innerHTML = '';

  images.forEach(image => {
    const imageCard = createCard(image);
    gallery.appendChild(imageCard);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function addImages(images) {
  images.forEach(image => {
    const imageCard = createCard(image);
    gallery.appendChild(imageCard);
  });

  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function createCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';
  card.style.width = '300px';
  card.style.border = '1px solid #ccc';
  card.style.padding = '10px';

  const photo = document.createElement('img');
  photo.src = image.webformatURL;
  photo.alt = image.tags;
  photo.loading = 'lazy';
  photo.style.width = '100%';
  photo.style.height = '200px';
  photo.style.objectFit = 'cover';

  const link = document.createElement('a');
  link.href = image.largeImageURL;
  link.appendChild(photo);

  const info = document.createElement('div');
  info.className = 'info';
  info.style.marginTop = '10px';
  info.style.display = 'flex';
  info.style.gap = '5px';
  info.style.justifyContent = 'space-evenly';
  info.style.textAlign = 'center';
  info.innerHTML = `
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      `;

  card.appendChild(link);
  card.appendChild(info);

  return card;
}

function showTotalHitsMessage(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function showMessageNoImages() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function showMessageEnd() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function showErrorMessage() {
  Notiflix.Notify.failure(
    'Error',
    'An error occurred while fetching the images. Please try again later.'
  );
}

function showBtnLoadMore() {
  btnLoadMore.style.display = 'block';
}

function hideBtnLoadMore() {
  btnLoadMore.style.display = 'none';
}

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
      searchImages();
    }
  });
}
// !------------------------scroll----------------
