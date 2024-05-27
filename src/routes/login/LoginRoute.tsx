import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { loginUser, mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloudLink from "../../components/CloudLink.tsx"
import BaseForm from "../../components/BaseForm.tsx"

export function Component() {
  const navigate = useNavigate()
  const { usernameOrEmail, password, errorMessages, asyncStatus } = useSelector(mainSelector)

  async function handleSubmit() {
    await appDispatch(loginUser({ usernameOrEmail, password }))
  }

  useEffect(() => {
    if (asyncStatus.loginUser === "fulfilled") {
      navigate("/login/complete")
    }
  }, [asyncStatus.loginUser])

  useEffect(() => {
    appDispatch(mainActions.resetFields(["usernameOrEmail", "password"]))
  }, [])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Rinkagu</Header>
      }
    >
      <Form
        actions={
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={asyncStatus.loginUser === "pending"}
          >Login</Button>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Login</Header>}>
            <SpaceBetween size="l">
              <BaseForm handleSubmit={handleSubmit}>
                <SpaceBetween size="s">
                  <FormField
                    label="Email or username"
                    errorText={errorMessages.usernameOrEmail}
                  >
                    <Input
                      value={usernameOrEmail}
                      onChange={({ detail }) => {
                        appDispatch(mainActions.updateSlice({ usernameOrEmail: detail.value, notifications: [] }))
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
                        appDispatch(mainActions.updateSlice({ password: detail.value, notifications: [] }))
                      }}
                      placeholder="Enter value"
                      type="password"
                    />
                  </FormField>
                </SpaceBetween>
              </BaseForm>
              <SpaceBetween size="s">
                <CloudLink href="/reset-password">Forgot password?</CloudLink>
                <SpaceBetween
                  size="s"
                  direction="horizontal"
                  alignItems="center"
                >
                  <TextContent>
                    <p>Don't have an account?</p>
                  </TextContent>
                  <CloudLink href="/new-user">Register</CloudLink>
                </SpaceBetween>
              </SpaceBetween>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
