import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import Home from "./pages/Home";
import Product from "./pages/Product";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<Product/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
