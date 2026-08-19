/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotificationPlacement, MessageType } from '../types'


interface AuthContextInterface {
    user: any // Replace 'any' with your user type
    openNotification: (
      placement: NotificationPlacement,
      message: MessageType
    ) => void
  }


  export type { AuthContextInterface }