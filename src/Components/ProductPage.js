import {useEffect, useState} from 'react';
import Products from './Products';
import Cart from './Cart';
import './ProductPage.css';

const ProductPage = ({shopifyClient}, props) => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shop, setShop] = useState({});
  const [checkout, setCheckout] = useState({ lineItems: []});
  const [discount, setDiscount] = useState(false);
  

  useEffect(() => {
    shopifyClient.checkout.create()
    .then((res) => {
      setCheckout(res)
    })
    .catch((err) => console.error(err))

      shopifyClient.product.fetchAll()
      .then((response) => {
        console.log('products', response)
      setProducts(response)
      })
      .catch((err) => console.error(err)) 

      shopifyClient.shop.fetchInfo()
      .then((res) => {
        setShop(res)
      })
      .catch((err) => console.error(err))
  }, [shopifyClient.product, shopifyClient.checkout, shopifyClient.shop]);

  const addVariantToCart = (variantId, quantity) => {

    const lineItemsToAdd = [{variantId, quantity:parseInt(quantity, 10)}];
    const checkoutId = checkout.id;
    return shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd)
    .then(res => {
      console.log('res', res)
      setCheckout(res)
      updateDiscount(res.subtotalPrice);
    })
    .catch((err) => console.error(err))
  }

  const updateDiscount = (subtotal) => {
    if(!discount && +subtotal >= 100){
      setDiscount(true)
      shopifyClient.checkout.addDiscount(checkout.id, '10 percent off') // missing actual discount code here  
      .then(res => {
        setCheckout(res)
      })
      .catch((err) => console.error(err));
    }
    else if(discount && +subtotal < 100){
      setDiscount(false);
      shopifyClient.checkout.removeDiscount(checkout.id)
      .then(res => {
        setCheckout(res)
      })
      .catch((err) => console.error(err));
    }
  }

  const updatedQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = checkout.id;
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}];

    return shopifyClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
    .then(res => {
      setCheckout(res);
      updateDiscount(res.subtotalPrice);
    })
    .catch((err) => console.error(err));
  }

  const removeLineItemInCart = (lineItemId) => {
    const checkoutId = checkout.id;

    return shopifyClient.checkout.removeLineItems(checkoutId, [lineItemId])
    .then(res => {
      setCheckout(res);
      updateDiscount(res.subtotalPrice);
    })
    .catch((err) => console.error(err));
  }

  const handleCartClose = () => {
    setIsCartOpen(false);
  }


  return (
    <div className='products-page'>
      <header className='products-header'>
        <div className='product-view-cart-wrapper'>
          <button className='product-view-cart' onClick={() => setIsCartOpen(!isCartOpen)}>Cart</button>
          </div>
          <div className='product-title'>
            <h1>{shop.name}: Dime Beauty Products</h1>
            <h2>{shop.description}</h2>
          </div>
      </header>
      <Cart 
      checkout={checkout}
      isCartOpen={isCartOpen}
      handleCartClose={handleCartClose}
      updatedQuantityInCart={updatedQuantityInCart}
      removeLineItemInCart={removeLineItemInCart}
      />
      <Products
      products={products}
      shopifyClient={shopifyClient}
      addVariantToCart={addVariantToCart}
      />
    </div>
  )

};



export default ProductPage;