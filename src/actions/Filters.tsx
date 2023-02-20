import React, { useCallback } from "react";
import { debounce } from "lodash";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IFilters } from "./types";

export function Filters({
  filters,
  setFilters,
  skillTypes,
}: {
  filters: IFilters;
  setFilters: (arg0: IFilters) => void;
  skillTypes: Array<string>;
}) {
  const debouncedChangeHandler = useCallback(
    debounce(
      (e) =>
        setFilters({
          playerName: e.target.value,
          skillType: filters.skillType,
        }),
      300
    ),
    [filters]
  );
  return (
    <Box sx={{ minWidth: 275, p: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Filter:
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Player name:
          </Typography>
          <OutlinedInput type="text" onChange={debouncedChangeHandler} />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Skill type:
          </Typography>
          <Select
            name="skill_type_select"
            onChange={(e) =>
              setFilters({
                playerName: filters.playerName,
                skillType: e.target.value as string,
              })
            }
          >
            <MenuItem value="">None</MenuItem>
            {skillTypes.map((skill: string, key: number) => (
              <MenuItem key={key} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </CardContent>
      </Card>
    </Box>
  );
}
