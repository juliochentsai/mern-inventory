import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { text: "add product", path: "add-product", icon: <FaWpforms /> },
  { text: "all product", path: "all-product", icon: <MdQueryStats /> },
  { text: "add order", path: "add-orders", icon: <ImProfile /> },
  { text: "orders", path: "orders", icon: <ImProfile /> },
  { text: "profile", path: "profile", icon: <ImProfile /> },
  { text: "todo", path: "todo", icon: <ImProfile /> },
  { text: "web view", path: "web", icon: <ImProfile /> },
  { text: "add web", path: "add-web", icon: <ImProfile /> },
  { text: "add image", path: "add-image", icon: <ImProfile /> },
  { text: "all image", path: "all-image", icon: <ImProfile /> },
];
export default links;
