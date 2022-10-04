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



  return (
    <div>Hello</div>
  )

};



export default ProductPage;