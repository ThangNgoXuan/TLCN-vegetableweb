import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { } from './images/profile.jpg';
import Layoutuser from './pages/Layoutuser';
import Layoutadmin from './pages/admin/Layoutadmin';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Layoutadmin} />
        <Route path="/" component={Layoutuser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App


