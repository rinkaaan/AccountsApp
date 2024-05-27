import { Button, Container, ContentLayout, Form, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"

export function Component() {
  return (
    <ContentLayout
      header={
        <Header variant="h1">Rikagu</Header>
      }
    >
      <Form
        actions={
          <Button
            variant="primary"
          >Return to app</Button>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Registration complete</Header>}>
            <TextContent>
              <p>Thank you for registering.</p>
            </TextContent>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
