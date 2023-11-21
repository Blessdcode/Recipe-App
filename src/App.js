import Catergory from "./components/Catergory";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Search />
      <Catergory />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
