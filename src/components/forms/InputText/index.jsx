import { node, object, string } from "prop-types";
import { forwardRef, useId } from "react";

export const InputText = forwardRef(function InputText(
  { label, style, ...htmlInputProps },
  ref
) {
  const idInput = useId();
  return (
    <div className="form-block" style={style}>
      {label && <label htmlFor={idInput}>{label}</label>}
      <input
        id={idInput}
        className="form-input"
        {...htmlInputProps}
        ref={ref}
      />
    </div>
  );
});

InputText.propTypes = {
  label: string,
  style: object,
  value: string,
  id: node,
};

InputText.defaultProps = {
  label: "",
  style: {},
};
