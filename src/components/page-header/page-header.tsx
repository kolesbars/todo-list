import { Container, Icon } from 'semantic-ui-react';

function PageHeader() {
  return (
    <Container
      as="h1"
      textContent="center"
      color="black"
      inverted
      floated="left"
    >
      <Icon name="file alternate outline" color="black"></Icon>
      Todo list
    </Container>
  );
}

export default PageHeader;
