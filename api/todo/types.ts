export enum TODOState {
  Active = 1,
  Completed
}

export interface TODO {
  // name of todo
  name: string;

  // state of todo,1: active, 2: completed
  state: TODOState;
}
