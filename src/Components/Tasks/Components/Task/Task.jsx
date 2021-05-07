import React from "react";
import {
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { styled } from "@material-ui/core/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledListItemText = styled(ListItemText)({
  fontFamily: "open-sans",
});

function Task({ id, title, checked, labelId, onEdit, onDelete, onCheck }) {
  return (
    <StyledPaper elevation={2}>
      <ListItem key={id}>
        <ListItemIcon>
          <Checkbox
            edge="end"
            checked={checked.indexOf(id) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={(e) => onCheck(id)}
          />
        </ListItemIcon>
        <StyledListItemText primary={title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={onEdit}>
            <Edit color="primary"/>
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
            <Delete color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </StyledPaper>
  );
}

export default Task;
