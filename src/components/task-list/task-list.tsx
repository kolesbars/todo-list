import { List, Container, Dimmer, Loader } from 'semantic-ui-react';
import { getTaskList, getIsLoading } from '../../store/tasks-data/selectors';
import { useAppSelector } from '../../hooks/hooks';
import TaskItem from '../task-item/task-item';

function TaskList() {

  const taskList = useAppSelector(getTaskList)
  const isLoading = useAppSelector(getIsLoading)

  return (
    <Container>
      <List celled divided selection data-testid="task-list">
        {taskList?.map((el) => {
          if (!isLoading) {
            return <TaskItem data={el} key={el.id} />;
          }
          return (
            <Dimmer active inverted key={el.id}>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          );
        })}
      </List>
    </Container>
  );
}

export default TaskList;
