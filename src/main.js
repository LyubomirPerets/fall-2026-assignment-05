import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;

const grid = document.getElementById('product-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
let currentPage = 1;

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.src = product.imageUrl;
  img.alt = product.name;
  img.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'product-body';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = product.category;

  const title = document.createElement('h3');
  title.className = 'product-title';
  title.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = priceFormatter.format(product.price);

  const description = document.createElement('p');
  description.className = 'product-description';
  description.textContent = product.description;

  body.append(badge, title, price, description);
  card.append(img, body);
  return card;
}

function renderPage(page) {
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const pageItems = products.slice(start, start + PRODUCTS_PER_PAGE);

  grid.replaceChildren(...pageItems.map(createProductCard));

  pageIndicator.textContent = `Page ${page} of ${totalPages}`;
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;
}

// Only the store page has a product grid; the other pages just load styles.
if (grid) {
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage(currentPage);
    }
  });

  renderPage(currentPage);
}
