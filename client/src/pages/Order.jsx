import { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2"
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function Order() {
  const [sdkReady, setSdkReady] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };


    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  //TODO fix state mutation
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup varient='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name: </strong>
              {order.user.name}
              <br />
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address:</strong>
                <br />
                {order.shippingAddress.address},<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode} <br />
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message varient='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message varient='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              <br />
              {order.paymentMethod}
              {order.isPaid ? (
                <Message varient='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message varient='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup varient='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price}
                          <br /> total: ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varient='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Order;
