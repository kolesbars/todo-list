import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { Button, Icon, Grid, Segment } from 'semantic-ui-react';
import { emptyTask } from '../../const';
import { updateCurrentTask } from '../../store/action';
import { loadTaskListAction } from '../../store/api-action';
import TaskList from '../task-list/task-list';
import FormModal from '../form-modal/form-modal';
import PageHeader from '../page-header/page-header';

function Main() {
  const dispatch = useAppDispatch();
  /**
   * Обновляет список задач при нажатии на кнопку
   */
  const handleClickUpdate = () => {
    dispatch(loadTaskListAction());
  };
  /**
   * Обновляет список задач и очищает данные текущей задачи при маунте компонента
   */
  useEffect(() => {
    dispatch(updateCurrentTask(emptyTask));
    dispatch(loadTaskListAction());
  }, []);

  return (
    <Segment>
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={5} textAlign="left">
            <PageHeader />
          </Grid.Column>
          <Grid.Column width={5} textAlign="right"></Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
        <Grid.Row columns={2} centered verticalAlign="middle">
          <Grid.Column width={10}>
            <FormModal isEdit={false} />
            <Button
              onClick={handleClickUpdate}
              size="large"
              primary
              floated="right"
            >
              <Icon name="redo alternate"></Icon>
              Обновить
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="3" textAlign="right"></Grid.Column>
          <Grid.Column width="10" stretched>
            <TaskList />
          </Grid.Column>
          <Grid.Column
            width="3"
            textAlign="left"
            verticalAlign="bottom"
          ></Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Main;
