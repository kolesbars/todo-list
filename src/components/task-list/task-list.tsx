import { List, Container, Dimmer, Loader } from 'semantic-ui-react';
import { useAppSelector } from '../../hooks/hooks';
import TaskItem from '../task-item/task-item';
import {
  getTaskList,
  getIsTaskListLoading,
} from '../../store/tasks-data/selectors';

function TaskList() {
  const taskList = useAppSelector(getTaskList);
  const isLoading = useAppSelector(getIsTaskListLoading);

  return (
    <Container>
      <List celled divided selection data-testid="task-list">
        {!isLoading ? (
          taskList?.map((task) => {
            return <TaskItem data={task} key={task.id} />;
          })
        ) : (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        )}
      </List>
    </Container>
  );
}

export default TaskList;
