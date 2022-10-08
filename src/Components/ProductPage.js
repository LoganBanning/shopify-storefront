import React, {useEffect, useState} from 'react';

const ProductPage = ({shopifyClient}) => {
  const [products, setProducts] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shop, setShop] = useState({});
  const [checkout, setCheckout] = useState({ lineItems: []});
  

  useEffect(() => {
      shopifyClient.product.fetchAll()
      .then((response) => setProducts(response))
      .catch((err) => console.error(err)) 

      shopifyClient.checkout.create()
      .then((res) => {
        setCheckout(res)
      })
      .catch((err) => console.error(err))

      shopifyClient.shop.fetchInfo()
      .then((res) => {
        setShop(res)
      })
      .catch((err) => console.error(err))
  }, [product, checkout, shop]);

  const addVariantToCart = (variantId, quantity) => {
    setIsCartOpen(true);

    const lineItemsToAdd = [{variantId, quantity:parseInt(quantity, 10)}];
    const checkoutId = checkout.id;

    return checkout.addLineItems(checkoutId, lineItemsToAdd)
    .then(res => {
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
    </div>
  )

};



export default ProductPage;