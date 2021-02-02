import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <Switch>
        {/* Auth */}
        <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
