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
}) {
  const styleOfIcons = [
    {

    },
    {
      fontSize: '20px', color: '#918A87',
    },
  ];
  const user = useCurrentUser();

  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Box>
        <IconButton sx={styleOfIcons[0]} onClick={() => handleDelete(cardId)}>
          <DeleteIcon sx={styleOfIcons[1]} />
        </IconButton>

        <IconButton sx={styleOfIcons[0]} onClick={() => handleEdit(cardId)}>
          <ModeEditIcon sx={styleOfIcons[1]} />
        </IconButton>
      </Box>
      <Box>
        <IconButton sx={styleOfIcons[0]}>
          <CallIcon sx={styleOfIcons[1]} />
        </IconButton>
        <IconButton sx={styleOfIcons[0]} onClick={() => handleLike(cardId)}>
          <FavoriteIcon sx={styleOfIcons[1]} />
        </IconButton>
      </Box>
    </CardActions>
  );
}
