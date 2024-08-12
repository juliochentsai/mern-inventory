import { Form, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Wrapper from "../assets/wrappers/TableRow";
const Product = ({
  _id,
  codigo,
  descripcion,
  codigo1,
  compra,
  precio,
  cajas,
  categoria_l0,
  categoria_l1,
  modelo,
  color,
  imageUrl,
}) => {
  return (
    <Wrapper>
      <td>{codigo}</td>
      <td>{descripcion}</td>
      <td>{codigo1}</td>
      <td>{compra}</td>
      <td>{precio}</td>
      <td>{cajas}</td>
      <td>{categoria_l0}</td>
      <td>{categoria_l1}</td>
      <td>{modelo}</td>
      <td>{color}</td>
      <td>
        <img src={imageUrl} alt="img" className="img" />
      </td>
      <td className="row_last">
        <Form>
          <Link to={`../edit-product/${_id}`} className="btn-edit">
            <FiEdit />
          </Link>
        </Form>
        <Form method="post" action={`../delete-product/${_id}`}>
          <button type="submit" className="btn-delete">
            <RiDeleteBin5Line />
          </button>
        </Form>
      </td>
    </Wrapper>
  );
};

export default Product;
