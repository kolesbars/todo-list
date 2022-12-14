import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import PageHeader from '../page-header/page-header';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import FormModal from '../form-modal/form-modal';
import { loadCurrentTaskAction } from '../../store/api-action';
import { checkeIsOverdue } from '../../utils/common';
import dayjs from 'dayjs';
import {
  Container,
  Header,
  Button,
  Segment,
  Dimmer,
  Loader,
  Icon,
  Grid,
} from 'semantic-ui-react';
import {
  getCurrentTaskData,
  getIsCurrentTaskLoading,
} from '../../store/tasks-data/selectors';

function TaskItemPage() {
  const data = useAppSelector(getCurrentTaskData);
  const isLoading = useAppSelector(getIsCurrentTaskLoading);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const deadlineDate = dayjs(data?.deadline);
  /**
   * Загружает данные текущей задачи при изменении идентификатора
   */
  useEffect(() => {
    dispatch(loadCurrentTaskAction(id));
  }, [id]);

  return (
    <Grid data-testid="task-item-page" centered>
      <Grid.Column width="7">
        <PageHeader />
        <Button as={Link} to={AppRoute.Main} color="black">
          <Icon name="arrow alternate circle left outline"></Icon>К списку задач
        </Button>
        {!isLoading ? (
          <>
            <Header as="h1" textAlign="center">
              {data?.title}
            </Header>
            {checkeIsOverdue(data?.deadline) && !data?.isCompleted && (
              <Segment color="red" inverted compact>
                <Header as="h3" inverted>
                  {'Задача просрочена'}
                </Header>
              </Segment>
            )}
            {data?.isCompleted && (
              <Segment color="green" inverted compact>
                <Header as="h3" floated="left" inverted>
                  {'Задача выполнена'}
                </Header>
              </Segment>
            )}
            <Header as="p" textAlign="center">
              {`Срок выполнения: ${deadlineDate.format('DD.MM.YYYY')}`}
            </Header>
            <Container text>
              <p>{data?.text}</p>
            </Container>
            <Segment textAlign="center" basic>
              {data?.fileURL && (
                <Button
                  as="a"
                  href={data?.fileURL}
                  target="_blank"
                  secondary
                  inverted
                >
                  <Icon name="download"></Icon>
                  Скачать документ
                </Button>
              )}
              <FormModal isEdit={true} />
            </Segment>
          </>
        ) : (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default TaskItemPage;
