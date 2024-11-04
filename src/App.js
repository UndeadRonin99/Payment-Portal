import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import PaymentComponent from './components/PaymentComponent';
import PaymentVerificationComponent from './components/PaymentVerificationComponent';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/make-payment" component={PaymentComponent} />
        <Route path="/verify-payment" component={PaymentVerificationComponent} />
      </Switch>
    </Router>
  );
}

export default App;
