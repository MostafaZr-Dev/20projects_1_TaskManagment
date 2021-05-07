import React, { useState } from "react";
import {
  Grid,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { useAppState } from "../../State";
import Task from "./Components/Task";
import Modal from "../Modal";

const StyledWrapper = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(3),
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontFamily: "itim",
  marginBottom: theme.spacing(1),
}));

const StyledEmptyItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "center",
}));

const StyledText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1rem",
});

function Tasks() {
  const { state, dispatch } = useAppState();

  const [checked, setChecked] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [action, setAction] = useState(null);
  const [title, setTitle] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "default",
  });

  const handleToggle = (taskId) => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const checkAllTask = (e) => {
    if (!e.target.checked) {
      setChecked([]);
      return;
    }
    const tasksIds = state.tasks.map((task) => task.id);
    setChecked(tasksIds);
  };

  const setTask = (task, action) => {
    setAction(action);
    setSelectedTask(task);
  };

  const editTask = (e) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id: selectedTask?.id,
        title: title,
      },
    });
    setAction(null);
  };

  const deleteTask = (e) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        id: selectedTask?.id,
      },
    });

    if (checked.includes(selectedTask?.id)) {
      setChecked((prevState) =>
        prevState.filter((taskId) => taskId !== selectedTask?.id)
      );
    }

    setAction(null);
  };

  const cancelAction = (e) => {
    setAction(null);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCloseSnackbar = (e) => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const deleteCheckedTasks = () => {
    if (checked?.length === 0) {
      setSnackbar({
        open: true,
        type: "error",
        message: "No task selected!",
      });
      return;
    }

    dispatch({
      type: "DELETE_SELECTED_TASK",
      payload: {
        tasksIds: checked,
      },
    });
    setChecked([]);
  };

  const list =
    state.tasks?.length > 0
      ? state.tasks.map((task, index) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            checked={checked}
            onCheck={handleToggle}
            onEdit={(e) => setTask(task, "edit")}
            onDelete={(e) => setTask(task, "delete")}
            labelId={`checkbox-list-label-${task.id}`}
          />
        ))
      : null;

  return (
    <StyledWrapper container justify="center">
      <Grid item xs={12} md={6}>
        <StyledHeader variant="h3">Tasks</StyledHeader>
        <List dense={true}>
          {list && (
            <>
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="end"
                    checked={checked?.length > 0}
                    tabIndex={-1}
                    disableRipple
                    onChange={checkAllTask}
                  />
                </ListItemIcon>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={deleteCheckedTasks}
                  >
                    <Delete color="secondary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {list}
            </>
          )}
          {!list && (
            <StyledEmptyItem>
              <Alert icon={false} severity="warning">
                Empty tasks
              </Alert>
            </StyledEmptyItem>
          )}
        </List>
        <Modal
          open={action === "edit"}
          onClose={cancelAction}
          title={
            <Typography>
              Edit Task
              <StyledText variant="caption">{` [ ${selectedTask?.title} ] `}</StyledText>
            </Typography>
          }
          maxWidth="md"
          actions={
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={cancelAction}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={editTask}>
                Edit
              </Button>
            </>
          }
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="title task"
            onChange={handleChangeTitle}
            defaultValue={selectedTask?.title}
            fullWidth
          />
        </Modal>
        <Modal
          open={action === "delete"}
          onClose={cancelAction}
          title={
            <Typography>
              Delete Task
              <StyledText variant="caption">{` [ ${selectedTask?.title} ] `}</StyledText>
            </Typography>
          }
          maxWidth="md"
          actions={
            <>
              <Button variant="contained" onClick={cancelAction}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteTask}
              >
                Delete
              </Button>
            </>
          }
        >
          <Typography>Are you sure?</Typography>
        </Modal>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Grid>
    </StyledWrapper>
  );
}

export default Tasks;
