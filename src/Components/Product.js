import {useEffect, useState} from 'react';
import VariantSelector from './VariantSelector';

const Product = (props) => {

  const [defaultOptionValues, setDefaultOptionValues] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedVariantImage, setSelectedVariantImage] = useState('');
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState('');

  useEffect(() => {
    props.product.options.forEach((selector) => {
      setDefaultOptionValues(selector.values[0].value)
    });
  }, [props.product.options]);



  const findImage = (images, variantId) => {
    const primary = images[0];

    const image = images.filter((image) => image.variant_ids.includes(variantId))
    return (image || primary).src;
  }

  const handleOptionChange = (event) => {
    const target = event.target;
    let selectedOptions = defaultOptionValues;
    selectedOptions[target.name] = target.value;

    const selectedVariant = props.client.product.helpers.variantForOptions(props.product, selectedOptions);

    setSelectedVariant(selectedVariant);
    setSelectedVariantImage(selectedVariant.attrs.image);
  }

  const handleQuantityChange = (event) => {
    setSelectedVariantQuantity(event.target.value);
  }

  let variantImage = selectedVariantImage || props.product.images[0];
  let variant = props.product.variants[0];
  let variantQuantity = selectedVariantQuantity || 1;
  let variantSelectors = props.product.options.map((option) => {
    return (
      <VariantSelector 
      handleOptionChange={handleOptionChange}
      key={option.id.toString()}
      option={option}
      />
    );
  });
  return (
    <div className='Product'>
      {props.product.images.length ? <img src={variantImage.src} alt={`${props.product.title} product shot`} /> : null}
      <h5 className='Product_title'>{props.product.title}</h5>
      <span className='Product_price'>${variant.price}</span>
      {variantSelectors}
      <label className='Product_option'>
        Quantity 
        <input min='1' type='number' defaultValue={variantQuantity} onChange={handleQuantityChange}></input>
      </label>
      <button className='Product_buy_button' onClick={() => props.addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
    </div>
  );
}

export default Product;