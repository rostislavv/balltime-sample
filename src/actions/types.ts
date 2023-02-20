export interface IAction {
  player_name: string;
  skill_type: string;
  timestamp: number;
  global_score: number;
}

export interface IActionWithId extends IAction {
  actionId: number;
}

export interface IEditActionValues {
  newPlayerName?: string;
  newSkillType?: string;
}
export interface IEditAction extends IEditActionValues {
  actionId?: number;
}

export interface IFilters {
  playerName: string;
  skillType: string;
}
