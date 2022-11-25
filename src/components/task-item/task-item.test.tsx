import TaskItem from './task-item';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { emptyTask } from '../../const';
import { firebaseApp } from '../../services/firebase';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

const middlewares = [thunk.withExtraArgument(firebaseApp)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof firebaseApp, Action>
>(middlewares);

const store = mockStore({
  isLoading: false,
  taskList: [],
});

const mockData = emptyTask;

describe('Component: TaskItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskItem data={mockData} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('task-item')).toBeInTheDocument();
  });
});
