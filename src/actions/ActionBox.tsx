import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { IAction } from "./types";
import { CardActions } from "@mui/material";

export function ActionBox({
  action,
  editAction,
}: {
  action: IAction;
  editAction: () => void;
}) {
  return (
    <Box sx={{ minWidth: 275, p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Game Action:
          </Typography>
          <Typography variant="body2">
            Player name: {action.player_name || "Unknown"}
          </Typography>
          <Typography variant="body2">
            Skill type: {action.skill_type || "Unknown"}
          </Typography>
          <Typography variant="body2">Time: {action.timestamp}</Typography>
          <Typography variant="body2">Score: {action.global_score}</Typography>
          <CardActions disableSpacing>
            <Button size="small" color="primary" onClick={() => editAction()}>
              Edit action
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}
