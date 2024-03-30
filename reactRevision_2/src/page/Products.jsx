// ProductsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./product.css"
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(7);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
        
        
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
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
