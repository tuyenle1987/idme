import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Purchase from './pages/Purchase';

import 'react-responsive-pagination/themes/classic.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Purchase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
