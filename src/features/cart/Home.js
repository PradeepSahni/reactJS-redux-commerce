import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    addCartItem, removeCartItem, updateCartItemQTY, checkoutShopping, emptyCart,
    selectStore
} from '../store/Slice';
import ProductList from './ProductList';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
function Home() {
    const myStoreData = useSelector(selectStore);
    const dispatch = useDispatch();
    const [products, setProducts] = useState(myStoreData.products)
    const [carts, setCarts] = useState(myStoreData.carts)
    const [pID, setPID] = useState(null)
    const [defaultSize, setDefaultSize] = useState('')
    const [defaultColor, setDefaultColor] = useState('')
    const [defaultQTY, setdefaultQTY] = useState(1)
    const [showPage, setShowPage] = useState('home')

    const checkout = (info) => {
        dispatch(checkoutShopping(info))
        dispatch(emptyCart())
        setShowPage('home')
        toast.success('Order Successfully.');
    }
    useEffect(() => {
        localStorage.setItem('cartsData', JSON.stringify(myStoreData.carts))

    }, [myStoreData.carts])

    const setDefaultSizeHandler = (size, row) => {
        setDefaultSize(size);
        setPID(row.id);
    }
    const setDefaultColorHandler = (Color, row) => {
        setDefaultColor(Color);
        setPID(row.id);
    }
    const setdefaultQTYHandler = (value, row) => {
        dispatch(updateCartItemQTY({ value: value, id: row.id }))
    }
    const addToCartHandler = (row) => {
        if (row && pID && defaultColor && defaultSize) {
            let cartId = new Date().valueOf();
            let setData = {
                id: cartId,
                productId: row.id,
                quantity: 1,
                size: defaultSize,
                color: defaultColor
            }
            dispatch(addCartItem(setData))
            setdefaultQTY(1)
            toast.success("Item added to cart.");
        }
        else {
            toast.error("Please select size and color!.");
        }
    }
    const removeFromCart = (row) => {
        dispatch(removeCartItem(row.id))
        toast("Item removed.");
    }

    const getOptions = (list) => {
        let Values = [];
        list.map((option) => {
            Values.push({
                value: option,
                label: option
            });
        });
        return Values;
    }

    useEffect(() => {
        setCarts(myStoreData.carts)
    }, [myStoreData.carts])

    const getProduct = (pID) => {
        let row = Object.values(
            products
        ).filter(
            (option) => option.id == pID
        )
        let data = {
            id: row.length ? row[0].id : '',
            name: row.length ? row[0].name : '',
            description: row.length ? row[0].description : '',
            price: row.length ? row[0].price : '',
            image: row.length ? row[0].image : '',
            category: row.length ? row[0].category : '',
            sizes: row.length ? row[0].sizes : [],
            colors: row.length ? row[0].colors : []
        }
        return data
    }
    return (
        <>
            <Container>
                {
                    showPage == 'cart' || showPage == 'checkout' ?
                        <Row>
                            <Col md={{ offset: 10 }} className="mb-4">
                                <h4> <Button className='btn btn-badge btn-dark' onClick={() => setShowPage('home')}>Home</Button></h4>

                            </Col>
                        </Row>
                        : ''
                }
                <Row>
                    <Col md={{ offset: 10 }} className="mb-4">
                        <h4> <Button className='btn btn-badge btn-dark' onClick={() => setShowPage('cart')}>Cart : {myStoreData.carts ? myStoreData.carts.length : 0}</Button></h4>

                    </Col>
                </Row>

                {/* <h1>Header Component </h1> */}
                <Row>
                    {
                        showPage == 'home' && products.length ?
                            <ProductList products={products} getOptions={getOptions} defaultSize={defaultSize} defaultColor={defaultColor} setDefaultColorHandler={setDefaultColorHandler} setDefaultSizeHandler={setDefaultSizeHandler} addToCartHandler={addToCartHandler} />
                            :
                            showPage == 'cart' && carts.length ?
                                <CartItem carts={carts} getProduct={getProduct} getOptions={getOptions} defaultSize={defaultSize} defaultColor={defaultColor} setDefaultColorHandler={setDefaultColorHandler} setDefaultSizeHandler={setDefaultSizeHandler} removeFromCart={removeFromCart} setdefaultQTYHandler={setdefaultQTYHandler} setShowPage={setShowPage} />
                                :
                                showPage == 'checkout' ?
                                    <>
                                        <CheckOut checkout={checkout} />
                                    </>
                                    :
                                    <>
                                        <center className='text-danger'>No Product Found!.</center>
                                    </>

                    }
                </Row>
                <ToastContainer />
            </Container>
        </>
    );
}

export default Home;