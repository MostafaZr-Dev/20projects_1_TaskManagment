import React, { useEffect } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

import { useAppState } from "../State";
import Header from "./Header";
import Tasks from "./Tasks";

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
}));

function App() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    let tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    if (tasks.length > 0) {
      dispatch({
        type: "INIT_TASKS",
        payload: {
          tasks,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tasks = JSON.stringify(state.tasks);
    localStorage.setItem("tasks", tasks);
  }, [state.tasks]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={12}>
          <Header title="ToDoList" />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <StyledBox>
            <Tasks />
          </StyledBox>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
