document.getElementById('searchBtn').addEventListener('click', async () => {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const status = document.getElementById('status');
    const productGrid = document.getElementById('productGrid');
  
    productGrid.innerHTML = '';
    status.textContent = 'Loading...';
  
    let url = 'https://mockapi.io/products?';
    const params = [];
  
    if (category) params.push(`category=${category}`);
    if (minPrice) params.push(`min_price=${minPrice}`);
    if (maxPrice) params.push(`max_price=${maxPrice}`);
    params.push(`sort=asc`);
  
    url += params.join('&');
  
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response was not ok');
      
      const products = await res.json();
      status.textContent = '';
  
      if (products.length === 0) {
        status.textContent = 'No products found.';
        return;
      }
  
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
        `;
        productGrid.appendChild(card);
      });
    } catch (error) {
      status.textContent = 'Failed to fetch products. Try again later.';
      console.error(error);
    }
  });
  