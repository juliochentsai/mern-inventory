import Wrapper from "../assets/wrappers/OrderRow";

const OrderRow = ({ type, name, value, labelText, onChange }) => {
  return (
    <Wrapper>
      <input
        className="row-input"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default OrderRow;
