import React,{useState} from "react";
import { Container,Row,Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckOut(props) {
    let [name,setName] = useState('');
    let [street,setStreet] = useState('');
    let [city,setCity] = useState('');
    let [state,setState] = useState('');
    let [zip,setZip] = useState('');
    let [cardNumber,setCardNumber] = useState('');
    let [expiryMonth,setExpiryMonth] = useState('');
    let [expiryYear,setExpiryYear] = useState('');
    let [cvv,setCvv] = useState('');

    const SubmitHandler = (e)=>{
        e.preventDefault();
        if(name && street && city && state && zip && cardNumber && expiryMonth && expiryYear && cvv){
            let data = {
                shippingAddress:{name,street,city,state,zip},
                payment : {
                    cardNumber,expiryMonth,expiryYear,cvv
                },
                success: true,
                error: false
            }
            props.checkout(data);
        }
        else{
            toast.error("All  fields are required.");
        }
    }
    return (
        <>
            <Container>
                <form onSubmit={SubmitHandler} action="#" mothod="post">
                <Row>
                    <center>
                        <h1>CheckOut </h1>
                    </center>
                    <Col md={{offset: 2 }}>
                        <label><b>Shipping Adress </b></label>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}  name="name" id="name" placeholder="Name.."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="text"  className="form-control"  name="street" value={street} onChange={(e)=>setStreet(e.target.value)} id="street" placeholder="Street.."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="text"  className="form-control"  name="city" value={city} onChange={(e)=>setCity(e.target.value)} id="city" placeholder="city.."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="text"  className="form-control"  name="state" value={state} onChange={(e)=>setState(e.target.value)} id="state" placeholder="state.."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="number" className="form-control" value={zip} onChange={(e)=>setZip(e.target.value)}  min={5}  name="zip" id="zip" placeholder="zip.."/>
                            </div>
                    </Col>
                    <Col md={{offset: 2 }}>
                            <label><b>Payment Info </b></label>
                            <div className="form-group mb-2">
                                <input type="text" minLength={16}  maxLength={18} className="form-control"  name="cardNumber" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} id="cardNumber" placeholder="Card Number"/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="number"  className="form-control"  name="expiryMonth" id="expiryMonth" value={expiryMonth} onChange={(e)=>setExpiryMonth(e.target.value)} placeholder="Expiry Month."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="number"  className="form-control"  name="expiryYear" value={expiryYear} onChange={(e)=>setExpiryYear(e.target.value)} id="expiryYear" placeholder="expiryYear.."/>
                            </div>
                            <div className="form-group mb-2">
                                <input type="number"  className="form-control"  name="cvv" value={cvv} onChange={(e)=>setCvv(e.target.value)} id="cvv" placeholder="cvv.."/>
                            </div>
                        <Button type="submit">Checkout</Button>
                    </Col>
                </Row>
                </form>
            </Container>
        </>
    );
}

export default CheckOut;