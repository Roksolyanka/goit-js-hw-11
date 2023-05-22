export function createCard(image) {
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
