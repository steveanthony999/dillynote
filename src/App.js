import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './GlobalStyle';

import PrivateRoute from './components/auth/PrivateRoute';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/dilly/Dashboard';
import Profile from './components/auth/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Private Routes */}
          <PrivateRoute exact path='/' component={Dashboard} />

          {/* User */}
          <PrivateRoute path='/profile' component={Profile} />

          {/* Auth */}
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </Switch>
        <GlobalStyle />
      </AuthProvider>
    </Router>
  );
}

export default App;
