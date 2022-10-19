import LineItem from './LineItem';
import './Cart.css';

const Cart = ({isCartOpen, handleCartClose, updatedQuantityInCart, removeLineItemInCart, checkout}) => {

  const openCheckout = () => {
    window.open(checkout.webUrl);
  }

  let line_items = checkout.lineItems.map((line_item) => {
    return (
      <LineItem
      updatedQuantityInCart={updatedQuantityInCart}
      removeLineItemInCart={removeLineItemInCart}
      key={line_item.id.toString()}
      line_item={line_item}
      />
    );
  });

  if(!isCartOpen){
    return null;
  }
  return (
    <div className='Cart-container' onWheel={(e) => this.wheel(e)} >
      <header className='Cart__header'>
        <h2>Your Cart</h2>
        <button
        onClick={handleCartClose}
        className='Cart__close'>
          Close Cart
        </button>
      </header>
      <ul className='Cart__line-items'>
        {line_items}
      </ul>
      <footer className='Cart__footer'>
        <div className='Cart-info clearfix'>
          <div className='Cart-into__total Cart-info__small'>Subtotal</div>
          <div className='Cart-info__pricing'>
            <span className='pricing'>$ {checkout.subtotalPrice}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {checkout.totalPrice}</span>
            </div>
          </div>
          <button className="Cart-checkout-button" onClick={openCheckout}>Checkout</button>
      </footer>
    </div>
  )
}

export default Cart;