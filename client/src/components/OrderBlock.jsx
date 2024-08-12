import Wrapper from "../assets/wrappers/OrderBlock";
import { Form, Link } from "react-router-dom";
const OrderBlock = ({
  _id,
  order_type,
  third_party,
  date,
  comment,
  status,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // e.g., "7/28/2024" in US locale
  };

  const itemClass = status === "approved" ? "box-approved" : "box-pending";
  return (
    <Wrapper>
      <Form>
        <Link to={`../view-orders/${_id}`} className="box">
          <div className="box-item">{formatDate(date)}</div>
          <div className="box-item">{order_type}</div>
          <div className="box-item">{third_party}</div>
          <div className="box-item">
            <div className={`${itemClass}`}>{status}</div>
          </div>
        </Link>
      </Form>
    </Wrapper>
  );
};

export default OrderBlock;
