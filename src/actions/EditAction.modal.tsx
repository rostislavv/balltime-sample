import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { IActionWithId, IEditAction } from "./types";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function EditActionModal({
  open,
  handleClose,
  playerNames,
  skillTypes,
  selectedEditAction,
}: {
  open: boolean;
  handleClose: (editAction: IEditAction) => () => void;
  playerNames: Array<string>;
  skillTypes: Array<string>;
  selectedEditAction: IActionWithId | null;
}) {
  const [newPlayerName, setNewPlayerName] = useState<string>();
  const [newSkillType, setNewSkillType] = useState<string>();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose({
          actionId: selectedEditAction?.actionId,
          newPlayerName,
          newSkillType,
        })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Skill Type:
          </Typography>

          <FormControl fullWidth>
            <Select
              name="new_skill_type"
              onChange={(e) => setNewSkillType(e.target.value as string)}
              value={newSkillType || selectedEditAction?.skill_type}
            >
              {skillTypes.map((skill: string, key: number) => (
                <MenuItem key={key} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Player Name:
          </Typography>

          <FormControl fullWidth>
            <Select
              name="new_player_name"
              onChange={(e) => setNewPlayerName(e.target.value as string)}
              value={newPlayerName || selectedEditAction?.player_name}
            >
              {playerNames.map((name: string, key: number) => (
                <MenuItem key={key} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
