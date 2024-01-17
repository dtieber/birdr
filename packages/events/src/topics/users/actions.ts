export enum UserActions {
  USER_CREATED = 'USER_CREATED',
  USER_DELETED = 'USER_DELETED',
}

export type UserActionsType = keyof typeof UserActions
