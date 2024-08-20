import { useState, useEffect } from "react";
import { Modal } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/SelectModal";

const SelectModal = ({ imageKey, onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customFetch.get("/images");

        setOptions(data.images);
      } catch (error) {
        toast.error(error?.response.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    onChange({ target: { name: imageKey, value: event.target.value } });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <select
        className="select-key"
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option, ind) => (
          <option key={ind} value={option.imageUrl}>
            {option.imageName}
          </option>
        ))}
      </select>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={selectedOption}
      />
    </Wrapper>
  );
};

export default SelectModal;
