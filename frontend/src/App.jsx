import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/Routes/Homepage';
import Cart from './components/Routes/Cart';
import Inbox from './components/Routes/Inbox';
import VendorList from './components/Routes/VendorList';
import ProductList from './components/Routes/ProductList';
import CategoryList from './components/Routes/CategoryList';
import Checkout from './components/Routes/Checkout';
import Login from './components/Routes/Login';
import LocationList from './components/Routes/LocationList';
import OrderConfirmation from './components/Routes/OrderConfirmation';
import ChatListItem from './components/Body/ChatListItem';
import VendorProfile from './components/Routes/VendorProfile';
import NewVendor from './components/Routes/NewVendor';
import NewProduct from './components/Routes/NewProduct';

function App() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [user, setUser] = useState(null);

  const userId = 1;

  // a route to pull products data from the db (backend)
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
        setAllProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error with products data!', error);
      });
  }, []);

  // a route to pull vendors data from the db (backend)
  useEffect(() => {
    axios.get('/api/vendors')
      .then(response => {
        setVendors(response.data);
        setAllVendors(response.data);
      })
      .catch(error => {
        console.error('There was an error with vendor data!', error);
      });
  }, []);

  // a route to pull location data from the db (backend)
  useEffect(() => {
    axios.get('/api/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('There was an error with locations data!', error);
      });
  }, []);

  // a route to pull all category data from the db (backend)
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        // // console.log('fetched categories:', response.data)
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error with category data!', error);
      });
  }, []);

  // a route to pull all orders data from the db (backend)
  useEffect(() => {
    axios.get(`/api/cart/${userId}`)
      .then(response => {
        setCartItems(response.data);
        // console.log("api/carts:",response.data)
        const totalCost = response.data.reduce((acc, item) => acc + item.price_cents * item.quantity, 0);
        setTotalCost(totalCost);
      })
      .catch(error => {
        console.error('There was an error with cart data!', error);
      });
  }, []);

  // console.log("Products Data---", products)
  // console.log("Vendors Data---", vendors)
  // console.log("categories in the App component: ------- ", categories)

  return (
    // Router must be in the top level of the app
    <Router>
      <div className="Homepage"></div>
      <Routes>
        <Route path="/" element={
          <Homepage
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/cart" element={
          <Cart
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
            cartItems={cartItems}
            totalCost={totalCost}
          />}
        />
        <Route path="/inbox" element={
          <Inbox
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/vendors" element={
          <VendorList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/products" element={
          <ProductList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/categories" element={
          <CategoryList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/checkout" element={
          <Checkout
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            user={user}
            setUser={setUser}
            cartItems={cartItems}
            totalCost={totalCost}
            setCartItems={setCartItems}
          />}
        />
        <Route path="/order-confirmation" element={
          <OrderConfirmation
            products={products}
            vendors={vendors}
            locations={locations}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/login" element={
          <Login
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/locations" element={
          <LocationList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/vendors/:vendorId" element={
          <VendorProfile
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/vendors/new" element={
          <NewVendor
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            setAllVendors={setAllVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/products/new" element={
          <NewProduct
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            vendors={vendors}
            setVendors={setVendors}
            allVendors={allVendors}
            setAllVendors={setAllVendors}
            locations={locations}
            categories={categories}
            user={user}
            setUser={setUser}
          />}
        />
        <Route path="/chats/:id" element={
          <ChatListItem user={user}
            setUser={setUser}
          />}
        />
      </Routes>
    </Router>
  );
};

export default App;
