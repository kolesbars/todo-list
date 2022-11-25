import { emptyTask } from '../../const';
import { tasksData } from './tasks-data';
import {
  updateTaskList,
  setIsLoading,
  updateCurrentTask,
  addNewTask,
  changeCompletedStatus,
  deleteTask,
  updateTask,
} from '../action';

describe('Reducer: TasksData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(tasksData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual({
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    });
  });

  it('should update task list', () => {
    const state = {
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    };

    const mockData = [emptyTask];

    expect(tasksData(state, updateTaskList(mockData))).toEqual({
      isLoading: false,
      taskList: mockData,
      currentTask: emptyTask,
    });
  });

  it('should set the loading status true', () => {
    const state = {
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    };
    const mockData = true;

    expect(tasksData(state, setIsLoading(mockData))).toEqual({
      isLoading: mockData,
      taskList: [],
      currentTask: emptyTask,
    });
  });

  it('should add new task to list', () => {
    const state = {
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    };
    const mockData = emptyTask;

    expect(tasksData(state, addNewTask(mockData))).toEqual({
      isLoading: false,
      taskList: [mockData],
      currentTask: emptyTask,
    });
  });

  it('should delete task', () => {
    const state = {
      isLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          date: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
    };

    const mockdId = '1';

    expect(tasksData(state, deleteTask(mockdId))).toEqual({
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    });
  });

  it('should update task', () => {
    const state = {
      isLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          date: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
    };
    const mockId = '1';
    const mockData = {
      id: '1',
      title: '1',
      text: '1',
      date: 1,
      deadline: 1,
      isCompleted: false,
    };

    expect(tasksData(state, updateTask(mockId, mockData))).toEqual({
      isLoading: false,
      taskList: [mockData],
      currentTask: mockData,
    });
  });

  it('should change completed status', () => {
    const state = {
      isLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          date: 0,
          deadline: 0,
          isCompleted: false,
        },
      ],
      currentTask: emptyTask,
    };

    const mockId = '1';

    expect(tasksData(state, changeCompletedStatus(mockId))).toEqual({
      isLoading: false,
      taskList: [
        {
          id: '1',
          title: '',
          text: '',
          date: 0,
          deadline: 0,
          isCompleted: true,
        },
      ],
      currentTask: emptyTask,
    });
  });

  it('should aupdate current task data', () => {
    const state = {
      isLoading: false,
      taskList: [],
      currentTask: emptyTask,
    };

    const mockData = {
      id: '1',
      title: '1',
      text: '1',
      date: 1,
      deadline: 1,
      isCompleted: false,
    };

    expect(tasksData(state, updateCurrentTask(mockData))).toEqual({
      isLoading: false,
      taskList: [],
      currentTask: mockData,
    });
  });
});
