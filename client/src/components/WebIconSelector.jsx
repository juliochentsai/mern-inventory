import { useState } from "react";
import { ICONS } from "../utils/icons";
import Wrapper from "../assets/wrappers/WebIconSelector";

const WebIconSelector = ({ iconName, onChange }) => {
  const [selectedIcon, setSelectedIcon] = useState({});

  const handleChange = (event) => {
    setSelectedIcon(event.target.value);
    onChange({ target: { name: iconName, value: event.target.value } });
  };

  const selectedImageSrc = ICONS[selectedIcon];
  return (
    <Wrapper>
      <div className="image-dropdown">
        <select
          className="image-dropdown-select"
          value={selectedIcon}
          onChange={handleChange}
        >
          {Object.keys(ICONS).map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>

        <div className="selected-image">
          {selectedImageSrc && (
            <img
              src={selectedImageSrc}
              alt={selectedIcon}
              className="icon-image"
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default WebIconSelector;
