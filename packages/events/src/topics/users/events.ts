import type { UserActions } from './actions'

export type UserCreatedPayload = {
  id: number
}

export type UserCreatedEvent = {
  action: UserActions.USER_CREATED,
  payload: UserCreatedPayload
}

export type UserDeletedPayload = {
  id: number
}

export type UserDeletedEvent = {
  action: UserActions.USER_DELETED,
  payload: UserDeletedPayload
}

export type UserEvent = UserCreatedEvent | UserDeletedEvent
