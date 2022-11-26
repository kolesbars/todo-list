import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import App from './app';
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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render main screen when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Todo list/i)).toBeInTheDocument();
  });
});
