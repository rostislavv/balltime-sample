import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl, vidEndpoint, testVidId } from "../constants";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { IFilters, IActionWithId, IEditAction } from "./types";
import { Filters } from "./Filters";
import { ActionBox } from "./ActionBox";
import { EditActionModal } from "./EditAction.modal";
import {
  dataMapper,
  filterActions,
  editAction as editActionUtility,
} from "./dataManipulation";
import cachedResponse from "../misc/cachedResponse.json";

export function ActionsList() {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState<Array<IActionWithId> | undefined>([]);
  const [skillTypes, setSkillType] = useState<Array<string>>([]);
  const [playerNames, setPlayerNames] = useState<Array<string>>([]);
  const [openEditActionModal, setEditActionModalOpen] = useState(false);
  const [selectedEditAction, setSelectedEditAction] =
    useState<IActionWithId | null>(null);

  const handleOpen = (action: IActionWithId) => () => {
    console.log('handleOpen', { action });
    setSelectedEditAction({ ...action });
    setEditActionModalOpen(true);
  };
  const handleClose = (editAction: IEditAction) => () => {
    console.log('handleClose');
    editActionUtility(actions, editAction, setActions);
    setSelectedEditAction(null);
    setEditActionModalOpen(false);
  };

  const [filters, setFilters] = useState<IFilters>({
    playerName: "",
    skillType: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(backendUrl + vidEndpoint(testVidId))
      .then((res) => {
        dataMapper(
          res.data.video_analysis,
          setActions,
          setSkillType,
          setPlayerNames
        );
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.error(e);
        dataMapper(
          cachedResponse.video_analysis,
          setActions,
          setSkillType,
          setPlayerNames
        );
        setLoading(false);
        // let's pretend that we have managed to get values anycase
      });
    // fetch only on mount
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Game Actions
          </Typography>

            <EditActionModal
              open={openEditActionModal}
              selectedEditAction={selectedEditAction}
              playerNames={playerNames}
              skillTypes={skillTypes}
              handleClose={handleClose}
            />
          <Filters
            filters={filters}
            setFilters={setFilters}
            skillTypes={skillTypes}
          />
          {actions &&
            filterActions(actions, filters).map(
              (action, key) => (
                <ActionBox
                  key={key}
                  action={action}
                  editAction={handleOpen(action)}
                />
              )
            )}
        </>
      )}
    </>
  );
}
