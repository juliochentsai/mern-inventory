import Wrapper from "../assets/wrappers/TableContainer";
import { useAllProductsContext } from "../pages/AllProduct";
import { Product } from "../components";
import { PRODUCT_FIELDS } from "../../../utils/constants";

const TableContainer = () => {
  const product_fields = Object.values(PRODUCT_FIELDS);
  const { data } = useAllProductsContext();
  const { products } = data;

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            {product_fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return <Product key={product._id} {...product} />;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default TableContainer;
