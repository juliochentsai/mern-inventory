import Wrapper from "../assets/wrappers/WebPreview";
import { ICONS } from "../utils/icons";
import ColorBar from "./ColorBar";
const formatCurrency = (amount) => {
  return !isNaN(amount) && amount !== null && amount !== undefined
    ? `$${parseFloat(amount).toFixed(2)}`
    : null;
};

const convertToList = (text) => {
  if (!text) return { paragraphs: [], bulletItems: [] }; // Return default values if text is null or empty

  const lines = text.split("\n");
  let paragraphs = [];
  let bulletItems = [];

  lines.forEach((line, index) => {
    if (line.trim().startsWith("-")) {
      bulletItems.push(
        <li key={index} className="bullet-item">
          {line.trim().slice(1).trim()}
        </li>
      );
    } else {
      paragraphs.push(
        <p key={index} className="normal-text">
          {line}
        </p>
      );
    }
  });

  return { paragraphs, bulletItems };
};

const DisplayFormattedText = ({ text }) => {
  const { paragraphs, bulletItems } = convertToList(text);

  return (
    <div className="formatted-text">
      {paragraphs}
      {bulletItems.length > 0 && <ul>{bulletItems}</ul>}
    </div>
  );
};

const WebPreview = ({ formValues }) => {
  const modelos = [
    ...new Set(
      Object.keys(formValues)
        .filter((key) => key.startsWith("modelo-"))
        .map((key) => formValues[key])
    ),
  ];
  const imageUrl = formValues["imageUrl-1"];
  const precioValue = formValues["precio-1"];
  const iconValue = ICONS[formValues["icon-1"]];
  const imageList = [
    formValues["image1-1"],
    formValues["image2-1"],
    formValues["image3-1"],
  ];

  const formattedPrice = formatCurrency(precioValue);
  return (
    <Wrapper>
      <div className="container">
        <div className="category-container">
          {formValues.mainCategory && (
            <div className="category">{formValues.mainCategory}</div>
          )}
          {formValues.mainCategory && formValues.subCategory && (
            <span className="separator"> &gt; </span>
          )}
          {formValues.subCategory && (
            <div className="category">{formValues.subCategory}</div>
          )}
          {formValues.subCategory && formValues.item && (
            <span className="separator"> &gt; </span>
          )}
          {formValues.item && <div className="category">{formValues.item}</div>}
        </div>
        <div className="product-section">
          <div className="image-wrapper">
            <img className="product-img" src={imageUrl} />
            <div className="product-img-bar">
              <ColorBar imageList={imageList} />
            </div>
          </div>
          <div className="product-details">
            <h5>{formValues.title}</h5>
            {formattedPrice && <p className="price">{formattedPrice}</p>}
            <DisplayFormattedText text={formValues.description} />

            <div className="color-bar">
              <div className="svg-container">
                <img className="icon-size" src={iconValue} />
              </div>

              <div className="color-options">
                {modelos.map((modelo, index) => (
                  <div key={index}>{modelo}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WebPreview;
