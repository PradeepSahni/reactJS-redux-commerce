import React,{useState} from "react";
import { Container,Row,Col, Button } from 'react-bootstrap';
import Select from 'react-select'

function CartItem(props) {
    const quantityOptions = [
        {label:1,value:1},
        {label:2,value:2},
        {label:3,value:3},
        {label:4,value:4}
    ]
    const [defaultSize,setDefaultSize] = useState('S')
    const [defaultColor,setDefaultColor] = useState('Black')
    return (
        <>
            <Container>
                <Row className="mb-4" >
                <center>
                        <h1>Cart Items </h1>
                    </center>
                {
                    props.carts.map((row,index)=>{
                        return  (
                            <Col key={index} md={{offset: 1 }} className="product-border-outer">
                                {
                                    console.log(props.getProduct(row.productId))
                                }
                            <img src={props.getProduct(row.productId).image} className="img-size"/>
                            <span>{props.getProduct(row.productId).name}</span>
                            <p>
                            <span><b>Price: </b>${props.getProduct(row.productId).price}</span>
    
                            </p>
                            <p>
                                <Row>
                                    <Col md={4}><b>Size :</b> 
                                        <Select 
                                            options={
                                                props.getProduct(row.productId).sizes !== undefined
                                                ? props.getOptions(props.getProduct(row.productId).sizes)
                                                : {}
                                            }
                                            onChange={(e)=>setDefaultSize(e.value)}
                                            value = {
                                                props.getOptions(props.getProduct(row.productId).sizes).filter(option => 
                                                   option.label == defaultSize)
                                             }
                                         />
                                    </Col>
                                    <Col md={4}><b>Color :</b>
                                        <Select 
                                            options={
                                                props.getProduct(row.productId).colors !== undefined
                                                ? props.getOptions(props.getProduct(row.productId).colors)
                                                : {}
                                            }
                                            onChange={(e)=>setDefaultColor(e.value)}
                                            value = {
                                                props.getOptions(props.getProduct(row.productId).colors).filter(option => 
                                                   option.label == defaultColor)
                                             }
                                        />
                                    </Col>
                                    <Col md={4}>
                                    <b>Quantity :</b>
                                    <Select 
                                        options={
                                            quantityOptions
                                        }
                                        onChange={(e)=>props.setdefaultQTYHandler(e.value,row)}
                                        value = {
                                            quantityOptions.filter(option => 
                                                option.label == row.quantity )
                                        }
                                    />
                                    </Col>
                                </Row>
                            
                            
                            </p>
                            <button onClick={()=> {props.removeFromCart(row)}} className='btn btn-xs btn-danger'>Remove  </button>
                            </Col>
                        )
                    })
                }
                </Row>
                <Row>
                    <Col md={{offset: 9 }}>
                        <Button onClick={()=>{props.setShowPage('checkout')} }>Checkout</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CartItem;