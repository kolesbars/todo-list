import { AppRoute } from '../../const';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from '../main/main';
import TaskItemPage from '../task-item-page/task-item-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main />
        </Route>
        <Route path={`${AppRoute.Task}/:id`} exact>
          <TaskItemPage />
        </Route>
        <Route path={AppRoute.NotFoundScreen}>
          <NotFoundPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
