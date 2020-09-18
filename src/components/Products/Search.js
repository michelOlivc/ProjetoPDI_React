import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadProducts } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    setEnteredFilter(props.searchName)
  }, [props.searchName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let url = 'http://localhost:8080/fazaconta/product';
      if(enteredFilter.length > 2) {
        url += `?name=${enteredFilter}`;
      }

      axios.get(url)
        .then(response => {
          const loadedProducts = [];

          for (const key in response.data) {
            loadedProducts.push({
              id: response.data[key].id,
              name: response.data[key].name,
              price: response.data[key].price
            });
          }

          onLoadProducts(loadedProducts);
        })
        .catch(error => {
          console.error(error);
        });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadProducts]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filtrar por Nome</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
