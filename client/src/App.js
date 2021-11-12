import { BrowserRouter, Route } from 'react-router-dom'
import { } from './images/profile.jpg';
import Layoutuser from './pages/Layoutuser';
import Layoutadmin from './pages/admin/Layoutadmin';


function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Layoutuser} />
      <Route path="/admin" component={Layoutadmin} />
    </BrowserRouter>
  );
}

export default App


