import { useAllWebViewContext } from "../pages/WebView";
import { WebItem } from "../components";
import Wrapper from "../assets/wrappers/WebItemContainer";

const WebItemContainer = () => {
  const { data } = useAllWebViewContext();
  const { item, totalItems, numOfPages } = data;

  return (
    <Wrapper>
      <div className="container">
        {item.map((x) => {
          return <WebItem key={x._id} {...x} />;
        })}
      </div>
    </Wrapper>
  );
};

export default WebItemContainer;
