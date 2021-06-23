import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "../Container";

import ListTasks from "../Tasks/ListTasks";
import PageLoader from "../PageLoader";
import tasksApi from "../../apis/tasks";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <ListTasks data={tasks} />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-xl leading-5 text-center">
        You have no tasks assigned. Sorry ... 😔
      </h1>
    </Container>
  );
};

export default Dashboard;
