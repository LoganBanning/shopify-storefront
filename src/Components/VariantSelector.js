const VariantSelector = (props) => {

  return (
    <select
    className='Product_option'
    name={this.props.option.name}
    key={this.props.option.name}
    onChange={this.props.handleOptionChange}
    >
      {this.props.option.value.map((value) => {
        return (
          <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
        )
      })}
    </select>
  );
}

export default VariantSelector;