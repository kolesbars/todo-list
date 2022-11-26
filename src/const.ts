import dayjs from 'dayjs';

export enum AppRoute {
  Main = '/',
  Task = '/task',
  NotFoundScreen = '/notfound',
}

export enum TaskTextLength {
  Start = 0,
  End = 400,
}

export const emptyTask = {
  title: '',
  text: '',
  createdDate: 0,
  deadline: dayjs().valueOf(),
  isCompleted: false,
};
