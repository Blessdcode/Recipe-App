import Catergory from "./components/Catergory";
import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom'



function App() {
  return (
    <BrowserRouter>
      <Catergory />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
