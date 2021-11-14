import { BrowserRouter, Route } from 'react-router-dom'
import { } from './images/profile.jpg';
import Layoutuser from './pages/Layoutuser';
import Layoutadmin from './pages/admin/Layoutadmin';


function App() {
  return (
    <BrowserRouter>
      <Route path="/admin" component={Layoutadmin} />
      <Route path="/" component={Layoutuser} />
    </BrowserRouter>
  );
}

export default App


