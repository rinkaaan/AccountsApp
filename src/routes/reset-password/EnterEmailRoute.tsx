import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector, resendVerification } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloudButton from "../../components/CloudButton.tsx"
import { ResendVerificationEmailRequest } from "../../../openapi-client"
import resetType = ResendVerificationEmailRequest.resetType
import BaseForm from "../../components/BaseForm.tsx"

export function Component() {
  const navigate = useNavigate()
  const { usernameOrEmail, errorMessages, asyncStatus } = useSelector(mainSelector)

  async function handleSubmit() {
    await appDispatch(resendVerification({ usernameOrEmail, resetType: resetType.RESET_PASSWORD, includeNotification: false }))
  }

  useEffect(() => {
    if (asyncStatus.resendVerification === "fulfilled") {
      navigate("/reset-password/verify")
    }
  }, [asyncStatus.resendVerification])

  useEffect(() => {
    appDispatch(mainActions.resetFields(["usernameOrEmail"]))
  }, [])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Rinkagu</Header>
      }
    >
      <Form
        actions={
          <SpaceBetween
            size="m"
            direction="horizontal"
          >
            <CloudButton
              variant="link"
              href="/login"
            >Cancel</CloudButton>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={asyncStatus.resendVerification === "pending"}
            >Next</Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Reset password</Header>}>
            <BaseForm handleSubmit={handleSubmit}>
              <FormField
                label="Email or username"
                errorText={errorMessages.usernameOrEmail}
              >
                <Input
                  value={usernameOrEmail}
                  onChange={({ detail }) => {
                    appDispatch(mainActions.updateSlice({ usernameOrEmail: detail.value }))
                  }}
                  placeholder="Enter value"
                />
              </FormField>
            </BaseForm>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
