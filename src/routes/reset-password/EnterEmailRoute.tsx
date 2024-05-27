import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createUser, mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloudButton from "../../components/CloudButton.tsx"

export function Component() {
  const navigate = useNavigate()
  const { email, username, password, errorMessages, asyncStatus } = useSelector(mainSelector)

  async function handleSubmit() {
    await appDispatch(createUser({ email, username, password }))
  }

  useEffect(() => {
    if (asyncStatus.createUser === "fulfilled") {
      navigate("/verify")
    }
  }, [asyncStatus.createUser])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Rikagu</Header>
      }
    >
      <Form
        actions={
          <SpaceBetween size="m" direction="horizontal">
            <CloudButton
              variant="link"
              href="/login"
            >Cancel</CloudButton>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={asyncStatus.createUser === "pending"}
            >Next</Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Reset Password</Header>}>
            <SpaceBetween size="l">
              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  label="Email or username"
                  errorText={errorMessages.username}
                >
                  <Input
                    value={username}
                    onChange={({ detail }) => {
                      appDispatch(mainActions.updateSlice({ username: detail.value }))
                    }}
                    placeholder="Enter value"
                  />
                </FormField>
              </form>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
