import Wrapper from "../assets/wrappers/Search";
import { Form, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { CATEGORIA_L0_TYPE, PRODUCT_SORT_BY } from "../../../utils/constants";
import { useAllProductsContext } from "../pages/AllProduct";
import { useState } from "react";
const SearchContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const { searchValues } = useAllProductsContext();
  const { categoria_l0, search } = searchValues;

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
    <Wrapper>
      <Form className="form">
        <button className="toggle-button" onClick={toggleBox}>
          Search
        </button>
        {isOpen && (
          <div className="form-container">
            <div className="box">
              <FormRow
                labelText="SEARCH FOR DESCRIPTION"
                type="search"
                name="search"
                defaultValue={search}
                onChange={debounce((form) => {
                  submit(form);
                })}
              />

              <FormRowSelect
                labelText="categoria_l0"
                name="categoria_l0"
                list={["all", ...Object.values(CATEGORIA_L0_TYPE)]}
                defaultValue={categoria_l0}
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              />

              <FormRowSelect
                labelText="SORT BY"
                name="sort"
                list={["all", ...Object.values(PRODUCT_SORT_BY)]}
                defaultValue="newest"
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              />
            </div>
          </div>
        )}
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
