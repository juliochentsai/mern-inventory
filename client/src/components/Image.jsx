import { Form, Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import Wrapper from "../assets/wrappers/Image";

const Image = ({ _id, ind, imageName, imageId, imageUrl }) => {
  return (
    <Wrapper>
      <td>{ind}</td>
      <td>{imageName}</td>
      <td>
        <img src={imageUrl} alt="img" className="img" />
      </td>
      <td className="row_last">
        <Form method="post" action={`../delete-image/${_id}`}>
          <button type="submit" className="btn-delete">
            <RiDeleteBin5Line />
          </button>
        </Form>
      </td>
    </Wrapper>
  );
};

export default Image;
