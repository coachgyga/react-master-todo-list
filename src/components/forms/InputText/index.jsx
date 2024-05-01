import { object, string } from "prop-types";
import { forwardRef, useId } from "react";
import "../forms.css";

const InputText = ({ label, style, error, ...htmlInputProps }, ref) => {
  const inputId = useId();

  return (
    <div className="form-block" style={style}>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input type="text" className="form-input" {...htmlInputProps} ref={ref} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default forwardRef(InputText);

InputText.propTypes = {
  label: string,
  style: object,
  error: string,
};

InputText.defaultProps = {
  label: "",
  error: "",
  style: {},
};
