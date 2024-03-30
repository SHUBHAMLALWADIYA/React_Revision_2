// Skeleton.js
const Skeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-action"></div>
      </div>
    </div>
  );
};

const renderStars = (rating) => {
  const stars = [];
  const roundedRating = Math.floor(rating); // Round down the rating to the nearest whole number
  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<span key={i}>&#9733;</span>); // Full star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Empty star
    }
  }
  return stars;
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './product.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    let filterPrice = parseFloat(categoryFilter);
    if (priceFilter === 'highToLow') {
      return parseFloat(product.price) <= filterPrice;
    }
    if (priceFilter === 'lowToHigh') {
      return parseFloat(product.price) >= filterPrice;
    }
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    if (ratingFilter && Math.floor(product.rating.rate) !== parseInt(ratingFilter)) {
      return false;
    }
    return true;
  });
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="filters">
        <label>Price Filter: </label>
        <select value={priceFilter} onChange={handlePriceFilterChange}>
          <option value="">None</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
        <label>Category Filter: </label>
        <select value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        <label>Rating Filter: </label>
        <select value={ratingFilter} onChange={handleRatingFilterChange}>
          <option value="">All</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div className="products-grid">
        {loading ? (
          Array.from({ length: productsPerPage }).map((_, index) => <Skeleton key={index} />)
        ) : (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Rating: {renderStars(product.rating.rate)} ({product.rating.count} reviews)</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
      <Pagination productsPerPage={productsPerPage} totalProducts={filteredProducts.length} paginate={paginate} />
    </div>
  );
};

export default ProductsPage;





// Pagination.js
const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


