const LineItem = (props) => {

  const decrementQuantity = (lineItemId) => {
    const updatedQuantity = this.props.line_item.quantity - 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  const incrementQuantity = (lineItemId) => {
    const updatedQuantity = this.props.line_item.quantity + 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  return (
    <li className='Line-item'>
      <div className='Line-item-img'>
        {this.props.line_item.variant.image ? <img src={this.props.line_item.variant.image.src} alt={`${this.props.line_itme.title} product shot`} /> : null}
      </div>
      <div className='Line-item-content'>
        <div className='Line-item-content-row'>
          <div className='Line-item-variant-title'>
            {this.props.line_item.variant.title}
          </div>
          <span className='Line-item-title'>
            {this.props.line_item.title}
          </span>
        </div>
        <div className='Line-item-content-row'>
          <div className='Line-item-quantity-container'>
          <button className='Line-item-quantity-update' onClick={() => decrementQuantity(this.props.line_item.id)}>-</button>
          <span className='Line-item-quantity'>{this.props.line_item.quantity}</span>
          <button className='Line-item-quantity-update' onClick={() => incrementQuantity(this.props.line_item.id)}>+</button>
        </div>
        <span className='Line-item-price'>${(this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2)}</span>
        <button className='Line-item-remove' onClick={() => this.props.removeLineItemInCart(this.props.line_item.id)}>x</button>
          </div>
      </div>
    </li>
  )
}

export default LineItem;