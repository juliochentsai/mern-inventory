import Wrapper from "../assets/wrappers/WebItem";
import { ColorBar } from "../components";

const WebItem = ({ _id, description, products, modelo, color }) => {
  const firstItemModelo = products[0].modelo;
  const filteredByModelo = products.filter(
    (product) => product.modelo === firstItemModelo
  );
  const seenColors = new Set();
  const uniqueColorProducts = filteredByModelo.filter((product) => {
    if (!seenColors.has(product.color)) {
      seenColors.add(product.color);
      return true; // Keep the product in the filtered array
    }
    return false; // Exclude the product from the filtered array
  });

  const [{ precio, imageUrl }] = uniqueColorProducts;
  const uniqueColors = [...seenColors];

  return (
    <Wrapper>
      <div>
        <img src={imageUrl} alt="img" className="img" />
      </div>
      <div>
        <ColorBar />
      </div>
      <div>
        <div>TITLE</div>
        <div>{description}</div>
      </div>
      <div>
        <div>{precio}</div>
      </div>
    </Wrapper>
  );
};

export default WebItem;
