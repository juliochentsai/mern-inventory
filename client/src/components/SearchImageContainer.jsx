import { useAllImagesContext } from "../pages/AllImage";
import { Form, useSubmit } from "react-router-dom";
const SearchImageContainer = () => {
  const { searchValues } = useAllImagesContext();
  const { search } = searchValues;
  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };
  return (
    <Form className="form">
      <div className="form-row">
        <label htmlFor="search" className="form-label">
          Search
        </label>
        <input
          type="search"
          id="search"
          name="search"
          className="form-input"
          defaultValue={search}
          onChange={debounce((form) => {
            submit(form);
          })}
        />
      </div>
    </Form>
  );
};

export default SearchImageContainer;
