import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"

export function Component() {
  const { verificationCode } = useSelector(mainSelector)

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
          <Container header={<Header variant="h2">Verify your email</Header>}>
            <form onSubmit={(e) => e.preventDefault()}>
              <SpaceBetween size="s">
                <FormField label="Verification code">
                  <Input
                    value={verificationCode}
                    onChange={({ detail }) => {
                      appDispatch(mainActions.updateSlice({ verificationCode: detail.value }))
                    }}
                    autoFocus
                    placeholder="Enter value"
                    type="email"
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
