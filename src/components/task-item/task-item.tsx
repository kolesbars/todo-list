import { AppRoute, TaskTextLength } from '../../const';
import { TaskType } from '../../types/task';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import dayjs from 'dayjs';
import {
  setCompletedStatusAction,
  deleteTaskAction,
} from '../../store/api-action';
import {
  Button,
  Checkbox,
  List,
  Segment,
  Header,
  Modal,
} from 'semantic-ui-react';

type TaskItemProps = {
  data: TaskType;
};

function TaskItem({ data }: TaskItemProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const formatedDate = dayjs(data.deadline).format('DD/MM/YYYY');
  /**
   * Перенаправляет на страницу текущей задачи
   */
  const handleToTaskCick = () => {
    if (data) {
      history.push(`${AppRoute.Task}/${data.id}`);
    }
  };
  /**
   * Открывает модальное окно для подтвержедения удаления
   */
  const handleDeleteClick = () => {
    setIsOpen(true);
  };
  /**
   * Удаляет задачу из списка
   */
  const handleConfirmClick = () => {
    if (data.id) {
      dispatch(deleteTaskAction(data.id));
    }
  };
  /**
   * Закрывает модальное окно подтверждения
   */
  const handleCancelClick = () => {
    console.log(isOpen);
    setIsOpen(false);
    console.log(isOpen);
  };
  /**
   * Изменяет статус выполнения задачи на противоположный
   */
  const handleChangeCompleted = () => {
    if (data.id) {
      dispatch(setCompletedStatusAction(data.id, !data.isCompleted));
    }
  };

  return (
    <Segment inverted={data.isCompleted}>
      <List.Item data-testid="task-item" inverted={data.isCompleted}>
        <List.Content floated="left">
          <Segment compact floated="right">
            <Checkbox
              checked={data.isCompleted}
              onChange={handleChangeCompleted}
              label={'Выполнено'}
            />
          </Segment>
          {dayjs(data.deadline) < dayjs() && !data.isCompleted && (
            <Segment color="red" inverted compact>
              <List.Description as="p" floated="left" inverted>
                {'Задача просрочена'}
              </List.Description>
            </Segment>
          )}
          <List.Header as="h4" floated="left">
            {data?.title}
          </List.Header>
          <List.Description as="p" floated="left">
            {`Срок выполнения: ${formatedDate}`}
          </List.Description>
          <List.Description as="p" floated="left">
            {data.text && data.text?.length > TaskTextLength.End
              ? `${data.text?.slice(
                  TaskTextLength.Start,
                  TaskTextLength.End
                )}...`
              : `${data.text}`}
          </List.Description>
          <Modal
            onClose={() => setIsOpen(true)}
            onOpen={() => setIsOpen(true)}
            open={isOpen}
            trigger={
              <Button onClick={handleDeleteClick} primary>
                Удалить
              </Button>
            }
          >
            <Modal.Content image>
              <Modal.Description>
                <Header>Удалить задачу?</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={handleConfirmClick}>
                Ok
              </Button>
              <Button color="black" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Modal.Actions>
          </Modal>
          <Button onClick={handleToTaskCick} primary>
            К задаче
          </Button>
          {data.fileURL && (
            <Button as="a" href={data.fileURL} target="_blank" floated="right">
              Скачать документ
            </Button>
          )}
        </List.Content>
      </List.Item>
    </Segment>
  );
}

export default TaskItem;
