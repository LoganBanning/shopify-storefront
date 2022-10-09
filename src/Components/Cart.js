import LineItem from './LineItem';

const Cart = (props) => {

  const openCheckout = () => {
    window.open(props.checkout.webUrl);
  }

  let line_items = props.checkout.lineItems.map((line_item) => {
    return (
      <LineItem
      updateQuantityInCart={props.updateQuantityInCart}
      removeLineItemInCart={props.removeLineItemInCart}
      key={line_item.id.toString()}
      line_item={line_item}
      />
    );
  });

  return (
    <div className={`Cart ${this.props.isCartOpen ? 'Cart--open' : ''}`}>
      <header className='Cart__header'>
        <h2>Your Cart</h2>
        <button
        onClick={this.props.handleCartClose}
        className='Cart__close'>
          x
        </button>
      </header>
      <ul className='Cart__line-items'>
        {line_items}
      </ul>
      <footer className='Cart__footer'>
        <div className='Cart-info clearfix'>
          <div className='Cart-into__total Cart-info__small'>Subtotal</div>
          <div className='Cart-info__pricing'>
            <span className='pricing'>$ {props.checkout.subtotalPrice}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {props.checkout.totalPrice}</span>
            </div>
          </div>
          <button className="Cart__checkout button" onClick={openCheckout}>Checkout</button>
      </footer>
    </div>
  )
}

export default Cart;