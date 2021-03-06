import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './Components/Menu';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SinglePost from './Pages/SinglePost';

import logo from './fakebook-logo.gif';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <div className="logo">
            <img src={logo} alt="fakebook logo" />
          </div>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;