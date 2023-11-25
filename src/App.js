import Catergory from "./components/Catergory";
import Nav from "./components/Nav";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Search />
      <Catergory />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
