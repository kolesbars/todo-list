export enum AppRoute {
  Main = '/',
  Task = '/task',
  NotFoundScreen = '/notfound'
}

export enum TaskTextLength {
  Start = 0,
  End = 400,
}

export const emptyTask = {
  title: '',
  text: '',
  date: 0,
  deadline: 0,
  isCompleted: false,
};
