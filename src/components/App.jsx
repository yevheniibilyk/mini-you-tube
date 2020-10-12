import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import NavHeader from './NavHeader';
import Upload from './Upload';
import Home from './Home';

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Router>
        <NavHeader />
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}
