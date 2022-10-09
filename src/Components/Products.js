import Product from './Product';

const Products = (props) => {

  let products = this.props.products.map((product) => {
    return (
      <Product
      addVariantToCart={this.props.addVariantToCart}
      client={this.props.client}
      key={product.id.toString()}
      product={product}
      />
    )
  })

  return (
    <div className='Product-wrapper'>
      {products}
    </div>
  );
}

export default Products;