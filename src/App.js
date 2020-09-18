import React, { useContext } from 'react';

import Products from './components/Products/Products';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if(authContext.isAuth) {
    content = <Products />;
  }

  return content;
};

export default App;
