import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Country from './components/Country'
import CountryDetailCard from './components/CountryDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/country/:name" element={<CountryDetailCard />} />
      </Routes>
  </Router>
  )
}

export default App
