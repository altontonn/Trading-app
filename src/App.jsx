import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';
import './App.css';

function App() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StockOverviewPage />} />
          <Route path='/detail/:symbol' element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
