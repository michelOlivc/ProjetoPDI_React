import React, { useContext } from 'react';

import Card from './UI/Card';
import { AuthContext } from '../context/auth-context';

import './Auth.css';

const Auth = props => {
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    authContext.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>Você não está autenticado!</h2>
        <p>Efetue o log in para continuar.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
