import FormModal from './form-modal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { firebaseApp } from '../../services/firebase';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { emptyTask } from '../../const';

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

const mockTask = emptyTask;

describe('Component: FormModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormModal isEdit={false} task={mockTask} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить новую задачу/i)).toBeInTheDocument();
  });
});
