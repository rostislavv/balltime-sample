import { IAction, IActionWithId, IFilters, IEditAction } from "./types";

export const unknownLabel = "Unknown";

export function dataMapper(
  video_analysis: Array<Record<string, unknown>>,
  setActions: (arg0: Array<IActionWithId>) => void,
  setSkillType: (arg0: Array<string>) => void,
  setPlayerNames: (arg0: Array<string>) => void
) {
  const sourceActions: Array<IActionWithId> = video_analysis.flatMap(
    (analysis: Record<string, unknown>) => analysis.actions as Array<IAction>
  ).map((action, key) => ({
    // additionally set default values for player_name and skill_type if there is nothing there, so we'll know
        ...action,
        actionId: key,
        player_name: action.player_name || unknownLabel,
        skill_type: action.skill_type || unknownLabel,
      }));

  setActions(sourceActions);
  // set unique set of skills across all skills
  setSkillType([
    ...new Set<string>(
      sourceActions.map((action) => action.skill_type || unknownLabel)
    ),
  ]);
  // set unique set of names across all names
  setPlayerNames([
    ...new Set<string>(
      sourceActions.map((action) => action.player_name || unknownLabel)
    ),
  ]);
}

export function filterActions(
  actions: Array<IActionWithId>,
  filters: IFilters
): Array<IActionWithId> {
  return actions?.filter((action: IAction) => {
    // if player name isn't empty
    return filters.playerName
      ? // check wether player name includes selected filter for fuzzy finding
        action.player_name?.includes(filters.playerName)
      : // either if skillType not empty
      filters.skillType
      ? // check exact match on selected skillType (since dropdown)
        action.skill_type === filters.skillType
      : // default to true - to not to filter out
        true;
  });
}

// warning - mutates original array!
export function editAction(
  actions: Array<IActionWithId> | undefined,
  editAction: IEditAction,
  setActions: (arg0: Array<IActionWithId>) => void
): void {

  // no-op if something that we don't expect
  if (!actions || !editAction || editAction.actionId === undefined) return;
  const originalItem = actions && actions[editAction.actionId];
  console.log('actionId', editAction.actionId);
  const modifiedItem = {
    ...originalItem,
    skill_type: editAction.newSkillType || originalItem.skill_type,
    player_name: editAction.newPlayerName || originalItem.player_name,
  };
  console.log({ modifiedItem });
  actions?.splice(editAction.actionId, 1, modifiedItem);
  console.log('editedActions', actions);
  setActions(actions);
}
