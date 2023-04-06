import './App.css'
import { BrowserRouter, Routes, Route, Router, HashRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Detail from './pages/Detail/Detail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />}/>
          <Route path="/detail/:id" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
