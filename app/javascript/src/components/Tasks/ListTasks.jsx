import React from "react";
import Table from "./Table";

const ListTasks = ({ data, destroyTask, updateTask, showTask }) => {
  return (
    <Table
      data={data}
      destroyTask={destroyTask}
      updateTask={updateTask}
      showTask={showTask}
    />
  );
};

export default ListTasks;
