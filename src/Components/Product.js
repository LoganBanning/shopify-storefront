import {useState} from 'react';
import VariantSelector from './VariantSelector';

const Product = (props) => {
  
  let defaultOptionValues = {};
  props.product.options.forEach((selector) => {
    defaultOptionValues[selector.name] = selector.values[0].value;
  });
  const [defaultOptionValues, setDefaultOptionValues] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedVariantImage, setSelectedVariantImage] = useState('');
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState('');

  const findImage = (images, variantId) => {
    const primary = images[0];

    const image = images.filter((image) => image.variant_ids.includes(variantId))
    return (image || primary).src;
  }

  const handleOptionChange = (event) => {
    const target = event.target;
    let selectedOptions = defaultOptionValues;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions);

    setSelectedVariant(selectedVariant);
    setSelectedVariantImage(selectedVariant.attrs.image);
  }

  const handleQuantityChange = (event) => {
    setSelectedVariantQuantity(event.target.value);
  }

  let variantImage = selectedVariantImage || this.props.product.images[0];
  let variant = selectedVariant || this.props.product.variants[0];
  let variantQuantity = selectedVariantQuantity || 1;
  let variantSelectors = this.props.product.options.map((option) => {
    return (
      <VariantSelector 
      handleOptionChange={this.handleOptionChange}
      key={option.id.toString()}
      option={option}
      />
    );
  });
  return (
    <div className='Product'>
      {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`} /> : null}
      <h5 className='Product_title'>{this.props.product.title}</h5>
      <span className='Product_price'>${variant.price}</span>
      {variantSelectors}
      <label className='Product_option'>
        Quantity 
        <input min='1' type='number' defaultValue={variantQuantity} onChange={this.handleQuantityChange}></input>
      </label>
      <button className='Product_buy_button' onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
    </div>
  );
}

export default Product;