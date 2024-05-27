import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createUser, mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloudLink from "../../components/CloudLink.tsx"

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
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={asyncStatus.createUser === "pending"}
          >Login</Button>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Login</Header>}>
            <SpaceBetween size="l">
              <form onSubmit={(e) => e.preventDefault()}>
                <SpaceBetween size="s">
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
              </form>
              <SpaceBetween size="s">
                <CloudLink href="/reset-password/enter-email">Forgot password?</CloudLink>
                <SpaceBetween
                  size="s"
                  direction="horizontal"
                  alignItems="center"
                >
                  <TextContent>
                    <p>Don't have an account?</p>
                  </TextContent>
                  <CloudLink href="/new-user/register">Register</CloudLink>
                </SpaceBetween>
              </SpaceBetween>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
