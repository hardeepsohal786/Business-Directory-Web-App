import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessProducts = ({ businessId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/business/${businessId}`)
      .then(res => setProducts(res.data));
  }, [businessId]);

  return (
    <div>
      <h3>Products</h3>
      {products.map((product, idx) => (
        <div key={idx}>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>{product.available ? 'Available' : 'Out of Stock'}</p>
        </div>
      ))}
    </div>
  );
};

export default BusinessProducts;