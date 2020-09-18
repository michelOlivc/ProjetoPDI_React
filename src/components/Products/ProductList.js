import React from 'react';

import './ProductList.css';

const ProductList = props => {
  return (
    <section className="product-list">
      <h2>Lista de Produtos</h2>
      <ul>
        {props.products.map(p => (
          <li key={p.id} onClick={props.onSelectedItem.bind(this, p.id)}>
            <span id="list-name">{p.name}</span>
            <span id="list-price">
              {p.price.toFixed(2).replace(".", ",")}
            </span>
            <span 
              id="remove-icon" 
              onClick={props.onRemoveItem.bind(this, p.id)}>X</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
