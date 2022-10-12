import Product from './Product';
import './Products.css';

const Products = ({products, addVariantToCart, shopifyClient}) => {

  return (
    <div className='Product-wrapper'>
      {products.map((product) => {
    return (
      <Product
      addVariantToCart={addVariantToCart}
      shopifyClient={shopifyClient}
      key={product.id.toString()}
      product={product}
      />
    )
  })}
    </div>
  );
}

export default Products;