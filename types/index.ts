/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NotificationArgsProps } from 'antd'

export enum REDUCERS {
  SET_USER = 'SET_USER'
}

export type ActionType = {
  payload: unknown
  type: REDUCERS
}


export type NotificationPlacement = NotificationArgsProps['placement']

export type MessageType = {
  message: string
  description: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

export type SignUpWithEmailParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};


export type SignInWithEmailParams = {
  email: string;
  password: string;
}