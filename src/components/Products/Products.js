import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const URL = 'https://faz-a-conta.herokuapp.com/product';

const Products = () => {
  
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [searchBar, setSearchBar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchProducts = useCallback((url, method, body, callback) => {
    setLoading(true);

    axios({
      method: method,
      url: url,
      data: body,
      responseType: 'json'
    })
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        setError(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts(URL, 'get', null, (data) => {
      setProducts(data);
    });
  }, [fetchProducts]);

  const filteredProductsHandler = useCallback(filteredProducts => {
    setProducts(filteredProducts);
  }, []);

  const refreshList = useCallback(() => {
    fetchProducts(URL, 'get', null, (data) => {
      setProducts(data);
    });
  }, [fetchProducts]);

  const addProductHandler = useCallback(product => {    
    const url = product.id ? `${URL}/${product.id}` : URL;
    const method = product.id ? 'put' : 'post';
    
    fetchProducts(url, method, product, () => {
      refreshList();
      setForm({ id: null, name: '', price: '' });
      setSearchBar('');
    });
  }, [fetchProducts, refreshList]);

  const removeProductHandler = useCallback(productId => {
    const url = `${URL}/${productId}`
    fetchProducts(url, 'delete', null, () => {
      refreshList();
    });
  }, [fetchProducts, refreshList]);  

  const selectProductHandler = useCallback(productId => {
    fetchProducts(`${URL}/${productId}`, 'get', null, (data) => {
      setForm(data);
    })
  }, [fetchProducts]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const productList = useMemo(() => {
    return (
      <ProductList 
        products={products}
        onSelectedItem={selectProductHandler}
        onRemoveItem={removeProductHandler}
      />
    );
  }, [products, removeProductHandler, selectProductHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <ProductForm
        product={form}
        onAddProduct={addProductHandler}
        loading={loading}
      />

      <section>
        <Search 
          onLoadProducts={filteredProductsHandler}
          searchName={searchBar}
        />
        {productList}
      </section>
    </div>
  );
};

export default Products;
