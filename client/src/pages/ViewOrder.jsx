import {
  redirect,
  useLoaderData,
  useParams,
  useNavigate,
  useOutletContext,
  Form,
  Link,
} from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/ViewOrder";
import { toast } from "react-toastify";
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/order/${params.id}`);

    return data;
  } catch (error) {
    return redirect("/dashboard/orders");
  }
};

const ViewOrder = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order } = useLoaderData();
  const { order_type, third_party, date, comments, status } = order;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // e.g., "7/28/2024" in US locale
  };

  const handleModify = async () => {
    try {
      // Send PATCH request to backend to change data from false to true
      await customFetch.patch(`/order/${id}/status`, {
        active: true,
      });

      navigate(0);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <div className="label-top-box">
        <div className="label-box">
          <label className="label-header">DATE</label>
          <p>{formatDate(date)}</p>
        </div>
        <div className="label-box">
          <label className="label-header">ORDER TYPE</label>
          <div>{order_type}</div>
        </div>
        <div className="label-box">
          <label className="label-header">THIRD PARTY</label>
          <p>{third_party}</p>
        </div>
        <div className="label-box">
          <label className="label-header">COMMENTS</label>
          <p>{comments}</p>
        </div>
        <div className="label-box">
          <label className="label-header">STATUS</label>
          <p>{status}</p>
        </div>
      </div>
      <div className="table-box">
        <div className="row">
          <label className="label-header row-other">CODIGO</label>
          <label className="label-header row-descripcion">DESCRIPCION</label>
          <label className="label-header row-other">CAJAS</label>
        </div>

        {order.orders.map((child, ind) => (
          <div key={ind} className="row">
            <p className="row-other">{child.codigo} </p>
            <p className="row-descripcion ">{child.descripcion} </p>
            <p className="row-other">{child.cajas} </p>
          </div>
        ))}
      </div>
      {status === "pending" && (
        <section className="btn-approve">
          <Link to={`../edit-orders/${id}`} className="btn">
            <FiEdit />
          </Link>

          <Form method="post" action={`../delete-order/${id}`}>
            <button type="submit" className="btn">
              DELETE
            </button>
          </Form>
          {user.role === "admin" && (
            <button className="btn" onClick={handleModify}>
              Approve
            </button>
          )}
        </section>
      )}

      {status === "approved" && (
        <div>
          {user.role === "admin" && (
            <div className="btn-approve">
              <button className="btn" onClick={handleModify}>
                ALLOW EDIT
              </button>
              <Form method="post" action={`../delete-order/${id}`}>
                <button type="submit" className="btn">
                  DELETE
                </button>
              </Form>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default ViewOrder;
