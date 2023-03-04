import React,{useState} from "react";
import { Container,Row,Col} from 'react-bootstrap';
import Select from 'react-select'

function ProductList(props) {
    const [defaultSize,setDefaultSize] = useState(props.defaultSize)
    const [defaultColor,setDefaultColor] = useState(props.defaultColor)
    return (
        <>
            <Container>

                <Row>
                <center>
                        <h1>Home </h1>
                    </center>
                {
                    props.products.map((row,index)=>{
                        return  (
                            <Col key={index} md={{offset: 1 }} className="product-border-outer">
                            <img src={row.image} className="img-size"/>
                            <span>{row.name}</span>
                            <p>
                            <span><b>Price: </b>${row.price}</span>
                            </p>
                            <p>
                                <Row>
                                    <Col md={6}><b>Size :</b> 
                                        <Select 
                                            options={
                                                row.sizes !== undefined
                                                ? props.getOptions(row.sizes)
                                                : {}
                                            }
                                            onChange={(e)=>props.setDefaultSizeHandler(e.value,row)}
                                            value = {
                                                props.getOptions(row.sizes).filter(option => 
                                                   option.label == props.defaultSize)
                                             }
                                         />
                                    </Col>
                                    <Col md={6}><b>Color :</b>
                                        <Select 
                                            options={
                                                row.colors !== undefined
                                                ? props.getOptions(row.colors)
                                                : {}
                                            }
                                            onChange={(e)=>props.setDefaultColorHandler(e.value,row)}
                                            value = {
                                                props.getOptions(row.colors).filter(option => 
                                                   option.label == props.defaultColor)
                                             }
                                        />
                                    </Col>
                                </Row>
                            </p>
                            <button onClick={()=> props.addToCartHandler(row)} className='btn btn-xs btn-primary'>Add to  cart </button>
                            </Col>
                        )
                    })
                }
                </Row>
            </Container>
        </>
    );
}

export default ProductList;