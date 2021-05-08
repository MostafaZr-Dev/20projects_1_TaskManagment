import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  Button,
} from "@material-ui/core";
import { AddCircleOutline, ListAlt } from "@material-ui/icons";
import { styled } from "@material-ui/core/styles";

import Modal from "../Modal";
import { useAppState } from "../../State";
import { generate } from "../../Services/hash";

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#747473",
}));

function Header({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const { dispatch } = useAppState();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const showAddBox = () => {
    setIsModalOpen(true);
  };

  const handleChangeTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const addTask = () => {
    if (!taskTitle || taskTitle.trim() === "") {
      setTaskTitle("");
      return;
    }

    const title = taskTitle.trim();

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: generate(),
        title: title,
      },
    });

    setIsModalOpen(false);
    setTaskTitle("");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">{title}</StyledTypography>
        <Tooltip title="list tasks">
          <IconButton edge="start" color="inherit">
            <ListAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="add task">
          <IconButton edge="start" color="inherit" onClick={showAddBox}>
            <AddCircleOutline />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title="Add Task"
        actions={
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={addTask}>
              Create
            </Button>
          </>
        }
        maxWidth="md"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="title task"
          value={taskTitle}
          onChange={handleChangeTitle}
          fullWidth
        />
      </Modal>
    </StyledAppBar>
  );
}

export default Header;
