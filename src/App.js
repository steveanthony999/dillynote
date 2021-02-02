import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './GlobalStyle';

import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Auth */}
          <Route path='/signup' component={Signup} />
        </Switch>
        <GlobalStyle />
      </AuthProvider>
    </Router>
  );
}

export default App;
