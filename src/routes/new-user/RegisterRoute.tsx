import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createUser, mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloudButton from "../../components/CloudButton.tsx"
import BaseForm from "../../components/BaseForm.tsx"

export function Component() {
  const navigate = useNavigate()
  const { email, username, password, errorMessages, asyncStatus } = useSelector(mainSelector)

  async function handleSubmit() {
    await appDispatch(createUser({ email, username, password }))
  }

  useEffect(() => {
    if (asyncStatus.createUser === "fulfilled") {
      navigate("/new-user/verify")
    }
  }, [asyncStatus.createUser])

  useEffect(() => {
    appDispatch(mainActions.resetFields(["email", "username", "password"]))
  }, [])

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
          <Container header={<Header variant="h2">Create an account</Header>}>
            <BaseForm handleSubmit={handleSubmit}>
              <SpaceBetween size="s">
                <FormField
                  label="Email address"
                  errorText={errorMessages.email}
                >
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
                <FormField
                  label="Username"
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
                <FormField
                  label="Password"
                  errorText={errorMessages.password}
                >
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
            </BaseForm>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
