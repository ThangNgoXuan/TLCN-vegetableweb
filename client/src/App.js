import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { } from './images/profile.jpg';
import Layoutuser from './pages/Layoutuser';
import Layoutadmin from './pages/admin/Layoutadmin';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './components/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Layoutadmin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Layoutuser} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App


