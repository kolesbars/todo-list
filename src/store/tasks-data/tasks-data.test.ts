import { emptyTask } from '../../const';
import { tasksData } from './tasks-data';
import {
  updateTaskList,
  setIsTaskListLoading,
  setIsCurrentTaskLoading,
  updateCurrentTask,
  addNewTask,
  changeCompletedStatus,
  deleteTask,
  updateTask,
} from '../action';

describe('Reducer: TasksData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(tasksData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should update task list', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };

    const mockData = [emptyTask];

    expect(tasksData(state, updateTaskList(mockData))).toEqual({
      isTaskListLoading: false,
      taskList: mockData,
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should set the task list loading status true', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };
    const mockData = true;

    expect(tasksData(state, setIsTaskListLoading(mockData))).toEqual({
      isTaskListLoading: mockData,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should add new task to list', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };
    const mockData = emptyTask;

    expect(tasksData(state, addNewTask(mockData))).toEqual({
      isTaskListLoading: false,
      taskList: [mockData],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should delete task', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          createdDate: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };

    const mockdId = '1';

    expect(tasksData(state, deleteTask(mockdId))).toEqual({
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should update task', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          createdDate: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };
    const mockId = '1';
    const mockData = {
      id: '1',
      title: '1',
      text: '1',
      createdDate: 1,
      deadline: 1,
      isCompleted: false,
    };

    expect(tasksData(state, updateTask(mockId, mockData))).toEqual({
      isTaskListLoading: false,
      taskList: [mockData],
      currentTask: mockData,
      isCurrentTaskLoading: false,
    });
  });

  it('should change completed status', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          createdDate: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };

    const mockId = '1';

    expect(tasksData(state, changeCompletedStatus(mockId))).toEqual({
      isTaskListLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          createdDate: 0,
          deadline: 0,
          isCompleted: true,
        },
      ],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    });
  });

  it('should aupdate current task data', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };

    const mockData = {
      id: '1',
      title: '1',
      text: '1',
      createdDate: 1,
      deadline: 1,
      isCompleted: false,
    };

    expect(tasksData(state, updateCurrentTask(mockData))).toEqual({
      isTaskListLoading: false,
      taskList: [],
      currentTask: mockData,
      isCurrentTaskLoading: false,
    });
  });

  it('should set the current task loading status true', () => {
    const state = {
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: false,
    };
    const mockData = true;

    expect(tasksData(state, setIsCurrentTaskLoading(mockData))).toEqual({
      isTaskListLoading: false,
      taskList: [],
      currentTask: emptyTask,
      isCurrentTaskLoading: mockData,
    });
  });
});
