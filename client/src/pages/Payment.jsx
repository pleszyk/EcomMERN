import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import Checkout from '../components/Checkout';

function Payment() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <Checkout step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' varient='primary' className='my-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default Payment;
