import { useState } from "react";
import InputText from "../../forms/InputText";
import Button from "../../ui/Button";

import { func } from "prop-types";
const INITIAL_FORM_VALUES = {
  title: "",
};

export const CreateTaskForm = ({ onSubmit }) => {
  const [formValues, setNewTask] = useState(INITIAL_FORM_VALUES);
  const [validationError, setValidationError] = useState();

  const handleChangeInput = (inputName) => (e) => {
    setNewTask({
      ...formValues,
      [inputName]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors;

    const { title } = formValues;

    if (title.length < 3) {
      errors = {
        ...errors,
        title: "The task title must contain at least 3 characters.",
      };
    }

    setValidationError(errors);

    return errors;
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (!errors) {
      onSubmit(formValues);
      setNewTask(INITIAL_FORM_VALUES);
    }
  };
  return (
    <form
      onSubmit={handleSubmitForm}
      style={{ display: "flex", gap: 8, marginBottom: 32 }}
    >
      <InputText
        label="Add a new task"
        error={validationError?.title}
        style={{ flexGrow: 1 }}
        onChange={handleChangeInput("title")}
        value={formValues.title}
      />
      <Button type="submit" style={{ marginTop: "auto" }}>
        Create
      </Button>
    </form>
  );
};

export default CreateTaskForm;

CreateTaskForm.propTypes = {
  onSubmit: func.isRequired,
};
