import { Row, Col } from 'react-bootstrap';
import Products from '../components/Products'
import { useState, useEffect } from 'react';
import axios from 'axios'

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export default Home;
