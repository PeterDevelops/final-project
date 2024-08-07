import React, {useState} from 'react';

const ProductListItem = (props) => {
  const { productData, vendors, cartItems, setCartItems } = props;
  const [added, setAdded] = useState(false);
  // console.log('productData:ProductListItem', productData);
  // add item to cart function
  const addToCart = (product) => {
    const vendor = vendors.find(vendor => vendor.id === product.vendor_id);
    const itemExist = cartItems.find(item => item.product_id === product.id);
    let updatedCartItems;
    if (itemExist) {
      updatedCartItems = cartItems.map(item =>
        item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem = {
        cart_item_id: cartItems.length + 1,
        price_cents: product.price_cents,
        product_id: product.id,
        product_name: product.name,
        product_photo_url: product.photo_url,
        quantity: 1,
        vendor_address: vendor?.address,
        vendor_city: vendor?.city,
        vendor_logo_url: vendor?.vendor_logo_url,
        vendor_name: vendor?.name
      };
      updatedCartItems = [...cartItems, newItem];
    }
    setCartItems(updatedCartItems);
  };
  console.log('cartItems:ProductListItem:', cartItems);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAdded(true);
  }

  return (
    <article className="flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
      <img
        src={productData.photo_url}
        alt={`${productData.name} image`}
        className="w-full md:w-1/3 md:object-cover md:object-contain"
      />
      <div className="p-5 w-full md:w-2/3">
        <h1 className="text-xl font-semibold">{productData.name}</h1>
        <p className="mt-2">Description: {productData.description}</p>
        <h3 className="mt-2 text-lg font-bold">${(productData.price_cents / 100.00).toFixed(2)}</h3>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleAddToCart(productData)}>

          {added ? 'Added' : 'Add To Cart'}
        </button>

      </div>
    </article>
  );
};

export default ProductListItem;

