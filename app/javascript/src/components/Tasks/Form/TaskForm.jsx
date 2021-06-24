import React from "react";

import Input from "../../Input";
import Button from "../../Button";

const TaskForm = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Docs Revamp"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
      />
    </form>
  );
};

export default TaskForm;
