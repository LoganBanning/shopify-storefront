import {useEffect, useState} from 'react';
import Products from './Products';
import Cart from './Cart';

const ProductPage = ({shopifyClient}, props) => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shop, setShop] = useState({});
  const [checkout, setCheckout] = useState({ lineItems: []});
  

  useEffect(() => {
    shopifyClient.checkout.create()
    .then((res) => {
      setCheckout(res)
    })
    .catch((err) => console.error(err))

      shopifyClient.product.fetchAll()
      .then((response) => {
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
    setIsCartOpen(true);

    const lineItemsToAdd = [{variantId, quantity:parseInt(quantity, 10)}];
    const checkoutId = checkout.id;
    return shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd)
    .then(res => {
      console.log('res', res)
      console.log('shopifyclient checkout', shopifyClient.checkout.addManuelDiscount)
      setCheckout(res)
    })
    .catch((err) => console.error(err))
  }

  const updatedQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = checkout.id;
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}];

    return clientInformation.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
    .then(res => {
      setCheckout(res);
    })
    .catch((err) => console.error(err));
  }

  const removeLineItemInCart = (lineItemId) => {
    const checkoutId = checkout.id;

    return clientInformation.checkout.removeLineItems(checkoutId, [lineItemId])
    .then(res => {
      setCheckout(res);
    })
    .catch((err) => console.error(err));
  }

  const handleCartClose = () => {
    setIsCartOpen(false);
  }



  return (
    <div className='products-page'>
      <header className='products-header'>
        {!isCartOpen &&
        <div className='product-view-cart-wrapper'>
          <button className='product-view-cart' onClick={() => setIsCartOpen(true)}>Cart</button>
          </div>
          }
          <div className='product-title'>
            <h1>{shop.name}: Dime-Beauty-Products</h1>
            <h2>{shop.description}</h2>
          </div>
      </header>
      <Products
      products={products}
      shopifyClient={shopifyClient}
      addVariantToCart={addVariantToCart}
      />
      <Cart 
      checkout={checkout}
      isCartOpen={isCartOpen}
      handleCartClose={handleCartClose}
      updatedQuantityInCart={updatedQuantityInCart}
      removeLineItemInCart={removeLineItemInCart}
      />
    </div>
  )

};



export default ProductPage;