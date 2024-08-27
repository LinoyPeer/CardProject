import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions } from "@mui/material";
import { useCurrentUser } from "../../../users/providers/UserProvider";

export default function CardActionBar({
  cardId,
  handleDelete,
  handleEdit,
  handleLike,
  likes
}) {
  const { user } = useCurrentUser();

  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Box>
        <IconButton onClick={() => handleDelete(cardId)}>
          {user && <DeleteIcon sx={{ fontSize: '20px', color: '#918A87' }} />}
        </IconButton>

        <IconButton onClick={() => handleEdit(cardId)}>
          {user && <ModeEditIcon sx={{ fontSize: '20px', color: '#918A87' }} />}
        </IconButton>
      </Box>
      <Box>
        <IconButton  >
          <CallIcon sx={{ fontSize: '20px', color: '#918A87' }} />
        </IconButton>
        <IconButton onClick={() => handleLike(cardId)}>
          <FavoriteIcon sx={{
            fontSize: '20px',
            color: likes.includes(user._id) ? 'red' : '#918A87',
            '&:hover': {
              color: likes.includes(user._id) ? 'red' : '#918A87',
            },
          }} />
        </IconButton>
      </Box>
    </CardActions>
  );
}
