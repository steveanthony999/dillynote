import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './GlobalStyle';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
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
