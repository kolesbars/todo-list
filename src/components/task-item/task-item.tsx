import { AppRoute, TaskTextLength } from '../../const';
import { TaskType } from '../../types/task';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { checkeIsOverdue } from '../../utils/common';
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
   * Открывает модальное окно подтвержедения удаления
   */
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  /**
   * Удаляет задачу из списка
   */
  const handleConfirmDeleteClick = () => {
    if (data.id) {
      dispatch(deleteTaskAction(data.id));
    }
  };
  /**
   * Закрывает модальное окно удаления
   */
  const handleCancelDeleteClick = () => {
    setIsDeleteModalOpen(false);
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
          {checkeIsOverdue(data.deadline) && !data.isCompleted && (
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
            onClose={() => setIsDeleteModalOpen(true)}
            onOpen={() => setIsDeleteModalOpen(true)}
            open={isDeleteModalOpen}
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
              <Button color="black" onClick={handleConfirmDeleteClick}>
                Ok
              </Button>
              <Button color="black" onClick={handleCancelDeleteClick}>
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
