import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Homepage from './components/Routes/Homepage';
import Cart from './components/Routes/Cart';
import Inbox from './components/Routes/Inbox';
import VendorList from './components/Routes/VendorList';
import ProductList from './components/Routes/ProductList';
import Checkout from './components/Routes/Checkout';
import Login from './components/Routes/Login';
import LocationList from './components/Routes/LocationList';
import OrderConfirmation from './components/Routes/OrderConfirmation';
import ChatListItem from './components/Body/ChatListItem';
import VendorProfile from './components/Routes/VendorProfile';
import AddEditVendor from './components/Routes/AddEditVendor';
import AddEditProduct from './components/Routes/AddEditProduct';
import ScrollToTop from './ScrollToTop';

function App({ location }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [user, setUser] = useState(null);
  const [quantities, setQuantities] = useState({});

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
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error with category data!', error);
      });
    }, []);

  // add cart item total
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = quantities[item.cart_item_id] || 1;
    return acc + (item.price_cents * quantity / 100);
  }, 0);

  const noSearchBar = ['/cart', '/checkout', '/inbox', '/chats', '/login', '/order-confirmation'];
  const shouldShowSearchBar = !noSearchBar.includes(location.pathname);

  const hiddenNavBarRoutes = ['/chats'];
  const shouldShowNavBar = !hiddenNavBarRoutes.some(route => location.pathname.startsWith(route));

  const mainClass = `bg-main font-body ${shouldShowNavBar ? (shouldShowSearchBar ? 'pt-navbar' : 'pt-navbar-no-search') : ''}`;

  return (
    <>
      {shouldShowNavBar && (
        <NavBar
          setProducts={setProducts}
          allProducts={allProducts}
          setVendors={setVendors}
          allVendors={allVendors}
          user={user}
          setUser={setUser}
          cartItems={cartItems}
          categories={categories}
        />
      )}
        <main className={mainClass}>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={
            <Homepage
              setProducts={setProducts}
              allProducts={allProducts}
              vendors={vendors}
              setVendors={setVendors}
              allVendors={allVendors}
              locations={locations}
            />}
          />
          <Route path='/cart' element={
            <Cart
              allProducts={allProducts}
              allVendors={allVendors}
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
              quantities={quantities}
              setQuantities={setQuantities}
              setTotalCost={setTotalCost}
              subtotal={subtotal}
            />}
          />
          <Route path='/inbox' element={
            <Inbox
              allProducts={allProducts}
              allVendors={allVendors}
              user={user}
            />}
          />
          <Route path='/vendors' element={
            <VendorList
              setVendors={setVendors}
              allVendors={allVendors}
              setProducts={setProducts}
              allProducts={allProducts}
              user={user}
            />}
          />
          <Route path='/products' element={
            <ProductList
              vendors={vendors}
              allVendors={allVendors}
              products={products}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
              quantities={quantities}
              setQuantities={setQuantities}
            />}
          />
          <Route path='/checkout' element={
            <Checkout
              allProducts={allProducts}
              allVendors={allVendors}
              user={user}
              cartItems={cartItems}
              setCartItems={setCartItems}
              quantities={quantities}
              subtotal={subtotal}
            />}
          />
          <Route path='/order-confirmation' element={
            <OrderConfirmation
              user={user}
            />}
          />
          <Route path='/login' element={
            <Login
              setUser={setUser}
            />}
          />
          <Route path='/locations' element={
            <LocationList
              setVendors={setVendors}
              allVendors={allVendors}
              setProducts={setProducts}
              allProducts={allProducts}
              locations={locations}
            />}
          />
          <Route path='/vendors/:vendorId' element={
            <VendorProfile
              vendors={vendors}
              setVendors={setVendors}
              allVendors={allVendors}
              setAllVendors={setAllVendors}
              products={products}
              setProducts={setProducts}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              locations={locations}
              categories={categories}
              user={user}
              setUser={setUser}
              cartItems={cartItems}
              setCartItems={setCartItems}
              quantities={quantities}
              setQuantities={setQuantities}
            />}
          />
          <Route path='/vendors/new' element={
            <AddEditVendor
              allVendors={allVendors}
              setAllVendors={setAllVendors}
              user={user}
            />}
          />
          <Route path='/vendors/edit/:vendorId' element={
            <AddEditVendor
              allVendors={allVendors}
              setAllVendors={setAllVendors}
              user={user}
            />}
          />
          <Route path='/products/new' element={
            <AddEditProduct
              setProducts={setProducts}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              vendors={vendors}
              setVendors={setVendors}
              allVendors={allVendors}
              categories={categories}
              user={user}
            />}
          />
          <Route path='/products/edit/:productId' element={
            <AddEditProduct
              setProducts={setProducts}
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              vendors={vendors}
              setVendors={setVendors}
              allVendors={allVendors}
              categories={categories}
              user={user}
          />}
          />
          <Route path='/chats/:id' element={
            <ChatListItem
              user={user}
            />}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
