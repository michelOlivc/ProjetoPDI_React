import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './ProductForm.css';

const ProductForm = React.memo(props => {
  const [enteredId, setEnteredeId] = useState();
  const [enteredName, setEnteredName] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');

  useEffect(() => {
    if(props.product) {
      setEnteredeId(props.product.id);
      setEnteredName(props.product.name);
      
      const price = parseFloat(props.product.price).toFixed(2);
      setEnteredPrice(price);
    }
  }, [props.product])

  const submitHandler = event => {
    event.preventDefault();
    
    const newProduct = {
      id: enteredId, 
      name: enteredName, 
      price: enteredPrice 
    }

    props.onAddProduct(newProduct);
  };

  return (
    <section className="product-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="name">Nome do produto</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={event => setEnteredName(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              value={enteredPrice}
              onChange={event => setEnteredPrice(event.target.value)}
            />
          </div>
          <div className="product-form__actions">
            <button type="submit">Salvar</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default ProductForm;
