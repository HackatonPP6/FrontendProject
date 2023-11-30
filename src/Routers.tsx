import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomeScreen/Home'
import { HistoricLogs } from './pages/HistoricLogs'

export default function Routers() {
    return (
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes" element={<HistoricLogs />}/>
        </Routes>
      </BrowserRouter>
    )
  }