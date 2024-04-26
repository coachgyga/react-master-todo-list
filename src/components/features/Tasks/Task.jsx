import { func, instanceOf, string } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { InputText } from "../../forms/InputText";
import Button from "../../ui/Button";

const Task = ({
  title,
  created_at,
  onDeleteTask: handleDeleteTask,
  onUpdateTask: handleUpdateTask,
}) => {
  const [isEditonModeActive, setIsEditionModeActive] = useState(false);
  const editTaskInputRef = useRef(null);
  const handleEditTitle = () => {
    setIsEditionModeActive(true);
  };

  useEffect(() => {
    if (isEditonModeActive) {
      editTaskInputRef.current.value = title;
    }
  }, [isEditonModeActive, title]);

  const handleSaveTitle = (e) => {
    // setIsEditionModeActive(true);
    e.preventDefault();
    handleUpdateTask({
      title: editTaskInputRef.current.value,
    });
    setIsEditionModeActive(false);
  };
  return (
    <tr>
      <td>
        {isEditonModeActive ? (
          <form onSubmit={handleSaveTitle} style={{ display: "flex", gap: 8 }}>
            <InputText ref={editTaskInputRef} />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </form>
        ) : (
          <span role="button" onClick={handleEditTitle}>
            {" "}
            {title}
          </span>
        )}
      </td>

      <td>{created_at.toLocaleDateString("fr-FR")}</td>
      <td>
        <Button variant="danger" onClick={handleDeleteTask}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Task;

Task.propTypes = {
  title: string.isRequired,
  created_at: instanceOf(Date).isRequired,
  onDeleteTask: func.isRequired,
  onUpdateTask: func,
};
