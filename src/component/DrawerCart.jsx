import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { isOpenDrawer } from '../features/cartSlice.js'
import IsChecked from './IsChecked.jsx';


//קומפוננטה להצגת סל קניות מוקטן
export default function DrawerCart() {

    let drawerIsOpen = useSelector(state => state.cart.drawerIsOpen)
    let cartDetails = useSelector(state => state.cart.arr)
    let sum = useSelector(state => state.cart.sum)
    let count = useSelector(state => state.cart.count)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [cartItems, setCartItems] = useState(
        cartDetails
    );

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const subtotal = sum;

    useEffect(() => {
        if (drawerIsOpen) {
            const timer = setTimeout(() => {
                dispatch(isOpenDrawer(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [drawerIsOpen]);

    return (
        <div>
            <Drawer open={drawerIsOpen} variant="persistent" style={{ width: '320px', padding: '25px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
                <Box sx={{ width: 420 }}>
                </Box>
                <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '1.3em', margin: 0 }}>Shopping cart</h2>
                    <span onClick={() => { dispatch(isOpenDrawer(false)) }} style={{ cursor: 'pointer' }}>X</span>
                </div>
                {cartItems.map((item) => (
                    <div key={item._id} style={{ padding: '15px', display: 'flex', alignItems: 'center', marginBottom: '2px', paddingBottom: '15px', borderBottom: '1px solid #ddd', marginLeft: "-15px" }}>
                        <IsChecked course={item} checked={item.checked} dis={false} />
                        <img  src={`https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${item?.img}`} alt={item.name} style={{ width: '80px', height: '90px', marginRight: '15px', borderRadius: "5px" }} />
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</div>
                            <div>Quantity: {item.qty}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>${item.price}</div>
                    </div>
                ))}
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', fontWeight: 'bold' }}>
                    <div >
                        <p><u>Subtotal</u>: ${subtotal}</p>
                        <p style={{ marginRight: "50px" }}><u>Count</u>: {count}</p>
                    </div>
                    <button style={{ backgroundColor: 'black', color: 'white', padding: '12px 18px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}> <Link to="/cart" onClick={() => dispatch(isOpenDrawer(false))}>Checkout</Link></button>
        </div>
            </Drawer >
        </div >

    );
}


