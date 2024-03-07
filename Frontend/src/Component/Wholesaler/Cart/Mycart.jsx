import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { WholesalerNavbar } from "../../Navbar/navbar"
import "./Mycart.css"

const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/addToCart/cartdisplay');
            setCartItems(response.data);
            calculateTotal(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((total, item) => total + item.calculatedPrice, 0);
        setAmount(totalAmount);
    };

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/addToCart/deletecart/${itemId}`);
            setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
            Swal.fire({
                icon: 'success',
                text: 'Product Deleted!'
            });
            calculateTotal(cartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const displayRazorpay = async () => {
        try {
            const response = await axios.post('http://localhost:5000/checkout', { amount });
            const options = {
                key: 'rzp_test_b5RTY86xi0zElh', // Replace with your Razorpay key
                currency: response.data.currency,
                amount: response.data.amount,
                order_id: response.data.id,
                name: 'Your Company Name',
                description: 'Description of your product',
                image: 'path_to_your_company_logo',
                handler: function (response) {
                    saveData();
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error initiating Razorpay payment:', error);
        }
    };

    const saveData = async () => {
        try {
            const checkoutData = {
                email: "satreshrutika@gmail.com",
                products: cartItems.map(item => item.productName),
                amount: amount,
                quantity: cartItems.map(item => item.quantity)
            };
            await axios.post("http://localhost:5000/checkout", checkoutData);
            Swal.fire({
                icon: 'success',
                title: 'Transaction Successful',
                text: 'Your order has been successfully placed!',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="position-fixed w-100" style={{ zIndex: "100000" }}>
                <WholesalerNavbar />
            </div>
            <br/>
            <br/>
            <br/>
            <div>
                <div className="cart-table-container">
                <h2><center>My Cart</center></h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item._id} className='cart-table'>
                                    <td><img src={item.Pimage} alt="" /></td>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity} KG</td>
                                    <td>₹{item.calculatedPrice}</td>
                                    <td><button onClick={() => handleDelete(item._id)}><RiDeleteBin6Fill /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br/>
                <center>
                <p>Total: ₹{amount}</p>
                <button onClick={displayRazorpay}>Buy Now</button>
                </center>
                <br/>
                <br/>
            </div>
        </>
    );
};

export default MyCart;