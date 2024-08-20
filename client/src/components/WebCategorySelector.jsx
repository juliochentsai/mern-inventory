import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/WebCategorySelector";

const WebCategorySelector = ({ GROUP_CATEGORIES, formValues, onChange }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    formValues.mainCategory || ""
  );

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    formValues.subCategory || ""
  );
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(formValues.item || "");

  const handleMainCategoryChange = (event) => {
    const mainCategory = event.target.value;
    setSelectedMainCategory(mainCategory);
    setSubCategoryOptions(
      GROUP_CATEGORIES[mainCategory]
        ? Object.keys(GROUP_CATEGORIES[mainCategory])
        : []
    );
    setSelectedSubCategory("");
    setItemOptions([]);
    setSelectedItem("");

    // Notify parent of changes
    onChange({ target: { name: "mainCategory", value: mainCategory } });
  };

  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategory(subCategory);
    setItemOptions(
      GROUP_CATEGORIES[selectedMainCategory] &&
        GROUP_CATEGORIES[selectedMainCategory][subCategory]
        ? GROUP_CATEGORIES[selectedMainCategory][subCategory]
        : []
    );
    setSelectedItem("");

    // Notify parent of changes
    onChange({ target: { name: "subCategory", value: subCategory } });
  };

  const handleItemChange = (event) => {
    const item = event.target.value;
    setSelectedItem(item);

    // Notify parent of changes
    onChange({ target: { name: "item", value: item } });
  };

  return (
    <Wrapper>
      <label>
        CATEGORY:
        <select
          name="mainCategory"
          value={selectedMainCategory}
          onChange={handleMainCategoryChange}
          required
        >
          <option value="">-</option>
          {Object.keys(GROUP_CATEGORIES).map((mainCategory) => (
            <option key={mainCategory} value={mainCategory}>
              {mainCategory}
            </option>
          ))}
        </select>
      </label>

      <label>
        SUB-CATEGORIA:
        <select
          name="subCategory"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          disabled={!selectedMainCategory}
          required
        >
          <option value="">-</option>
          {subCategoryOptions.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      </label>

      <label>
        ITEM:
        <select
          name="item"
          value={selectedItem}
          onChange={handleItemChange}
          disabled={!selectedSubCategory}
          required
        >
          <option value="">-</option>
          {itemOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </Wrapper>
  );
};

export default WebCategorySelector;
