const LineItem = (props) => {

  const decrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity - 1
    props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  const incrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity + 1
    props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  return (
    <li className='Line-item'>
      <div className='Line-item-img'>
        {props.line_item.variant.image ? <img src={props.line_item.variant.image.src} alt={`${props.line_item.title} product shot`} /> : null}
      </div>
      <div className='Line-item-content'>
        <div className='Line-item-content-row'>
          <div className='Line-item-variant-title'>
            {props.line_item.variant.title}
          </div>
          <span className='Line-item-title'>
            {props.line_item.title}
          </span>
        </div>
        <div className='Line-item-content-row'>
          <div className='Line-item-quantity-container'>
          <button className='Line-item-quantity-update' onClick={() => decrementQuantity(props.line_item.id)}>-</button>
          <span className='Line-item-quantity'>{props.line_item.quantity}</span>
          <button className='Line-item-quantity-update' onClick={() => incrementQuantity(props.line_item.id)}>+</button>
        </div>
        <span className='Line-item-price'>${(props.line_item.quantity * props.line_item.variant.price).toFixed(2)}</span>
        <button className='Line-item-remove' onClick={() => props.removeLineItemInCart(props.line_item.id)}>x</button>
          </div>
      </div>
    </li>
  )
}

export default LineItem;