import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import tasksApi from "apis/tasks";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Table from "components/Tasks/Table/index";

const Dashboard = ({ history }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      setPendingTasks(response.data.tasks.pending);
      setCompletedTasks(response.data.tasks.completed);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressToggle = async ({ slug, progress }) => {
    try {
      await tasksApi.update({ slug, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyTask = async slug => {
    try {
      await tasksApi.destroy(slug);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  const showTask = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  const starTask = async (slug, status) => {
    try {
      const toggledStatus = status === "starred" ? "unstarred" : "starred";
      await tasksApi.update({
        slug,
        payload: { task: { status: toggledStatus } },
      });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
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

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          destroyTask={destroyTask}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
          starTask={starTask}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          destroyTask={destroyTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
    </Container>
  );
};

export default Dashboard;
