import TaskList from './task-list';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
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
  isTaskListLoading: false,
  taskList: [],
});

describe('Component: TaskList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });
});
