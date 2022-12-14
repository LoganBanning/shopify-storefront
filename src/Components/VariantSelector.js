const VariantSelector = (props) => {

  return (
    <select
    className='Product_option'
    name={props.option.name}
    key={props.option.name}
    onChange={props.handleOptionChange}
    >
      {props.option.values.map((value) => {
        return (
          <option value={value} key={`${props.option.name}-${value}`}>{`${value}`}</option>
        )
      })}
    </select>
  );
}

export default VariantSelector;