import { object, string } from "prop-types";
import InputText from "../InputText";

export const InputSearch = ({ label, ...htmlInputElement }) => {
  return <InputText label={label} type="search" {...htmlInputElement} />;
};

InputSearch.propTypes = {
  style: object,
  label: string,
};
