import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"

export function Component() {
  const { email, password } = useSelector(mainSelector)

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
          >Next</Button>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Create an account</Header>}>
            <form onSubmit={(e) => e.preventDefault()}>
              <SpaceBetween size="s">
                <FormField label="Email address">
                  <Input
                    value={email}
                    onChange={({ detail }) => {
                      appDispatch(mainActions.updateSlice({ email: detail.value }))
                    }}
                    autoFocus
                    placeholder="Enter value"
                    type="email"
                  />
                </FormField>
                <FormField label="Password">
                  <Input
                    value={password}
                    onChange={({ detail }) => {
                      appDispatch(mainActions.updateSlice({ password: detail.value }))
                    }}
                    placeholder="Enter value"
                    type="password"
                  />
                </FormField>
              </SpaceBetween>
            </form>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
