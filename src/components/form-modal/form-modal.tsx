import { useState, ChangeEvent, useEffect } from 'react';
import { useRef } from 'react';
import { getCurrentTaskData } from '../../store/tasks-data/selectors';
import { setNewTaskAction, updateTaskAction } from '../../store/api-action';
import { TaskType } from '../../types/task';
import { emptyTask } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import dayjs from 'dayjs';
import {
  Form,
  Modal,
  Button,
  Container,
  Segment,
  Icon,
} from 'semantic-ui-react';
import 'dayjs/locale/es';

type FormModalProps = {
  isEdit: boolean;
};

function FormModal({ isEdit }: FormModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const currentData = useAppSelector(getCurrentTaskData);
  const [data, setData] = useState<TaskType>(currentData);

  const currentFile = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  /**
   * Записывает значения полей формы(Заголовок, описание, срок) в локальный state при изменении
   * @param event событие изменения данных полей формы
   */
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [event.currentTarget.name]: event.target.value });
  };
  /**
   * Записывает значение поля file в локальный state при изменении
   * @param event событие изменения поля file
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  /**
   * Закрывает модальное окно при нажатии, cбрасывает значения полей формы
   */
  const handleCloseClick = () => {
    setData(emptyTask);
    setIsModalOpen(false);
  };
  /**
   * Добавялет новую задачу при отправке формы, сбрасывает значения полей формы, закрывает модальное окно
   */
  const handleAddFormSubmit = () => {
    const fileToUpload = file || null;

    dispatch(setNewTaskAction(fileToUpload, data));
    setData(emptyTask);
    setFile(null);
    setIsModalOpen(false);
  };
  /**
   * Обновляет данные задачи при отправке формы, закрывает модальное окно
   */
  const handleEditFormSubmit = () => {
    dispatch(updateTaskAction(id, file, data));
    setIsModalOpen(false);
  };
  /**
   * Записывает данные задачи в локальный state при их изменении
   */
  useEffect(() => {
    setData(currentData);
  }, [currentData]);

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onOpen={() => setIsModalOpen(true)}
      open={isModalOpen}
      trigger={
        isEdit ? (
          <Button>
            <Icon name="pencil alternate"></Icon>
            Редактировать
          </Button>
        ) : (
          <Button centered primary size="large">
            Добавить новую задачу
          </Button>
        )
      }
    >
      <Modal.Header>
        {isEdit ? 'Редактирование задачи' : 'Добавить задачу'}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={isEdit ? handleEditFormSubmit : handleAddFormSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                value={data?.title}
                label="Заголовок"
                placeholder="Заголовок"
                name="title"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.TextArea
              required
              name="text"
              value={data?.text}
              label="Описание задачи"
              placeholder="Что нужно сделать?"
              onChange={handleFieldChange}
            />
            <Segment compact basic>
              <Form.Input
                required
                type="date"
                name="deadline"
                label="Срок выполнения"
                value={dayjs(data?.deadline).format('YYYY-MM-DD')}
                onChange={handleFieldChange}
              ></Form.Input>
            </Segment>
            <Form.Button
              type="button"
              content="Выбрать файл"
              labelPosition="left"
              icon="file"
              onClick={() => currentFile.current?.click()}
            />
            <input
              ref={currentFile}
              type="file"
              hidden
              onChange={handleFileChange}
            />
            {file && (
              <Container as="p" floated="right">
                {file?.name}
              </Container>
            )}
            <Form.Button type="submit" primary>
              {isEdit ? 'Редактировать' : 'Добавить'}
            </Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={handleCloseClick}>
          Закрыть
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default FormModal;
