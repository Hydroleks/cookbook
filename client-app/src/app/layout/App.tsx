import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PostForm from '../../features/posts/form/PostForm';
import RecipeDashboard from '../../features/recipes/dashboard/RecipeDashboard';

function App() {
  return (
    // Fragment groups things together, so we can return 2 things without the use of an empty div.
    // Shortcut version using Fragment is just empty <> as below.
    <> 
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/posts' component={PostDashboard}/>
        <Route exact path='/recipes' component={RecipeDashboard}/>
        <Route exact path='/createPost' component={PostForm}/>
      </Container>
    </>
  );
}

export default observer(App);
