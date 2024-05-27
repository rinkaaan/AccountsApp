import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector, resendVerification, resetPassword } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Link from "@cloudscape-design/components/link"
import { ResendVerificationEmailRequest } from "../../../openapi-client"
import resetType = ResendVerificationEmailRequest.resetType
import BaseForm from "../../components/BaseForm.tsx"

export function Component() {
  const navigate = useNavigate()
  const { verificationCode, usernameOrEmail, asyncStatus, errorMessages, password } = useSelector(mainSelector)

  useEffect(() => {
    if (!usernameOrEmail) {
      navigate("/login")
    }
  }, [usernameOrEmail])

  async function handleSubmit() {
    await appDispatch(resetPassword({ usernameOrEmail, verificationCode, newPassword: password }))
  }

  async function handleResendVerification() {
    await appDispatch(resendVerification({ usernameOrEmail, resetType: resetType.RESET_PASSWORD }))
  }

  useEffect(() => {
    if (asyncStatus.resetPassword === "fulfilled") {
      navigate("/reset-password/complete")
    }
  }, [asyncStatus.resetPassword])

  useEffect(() => {
    appDispatch(mainActions.resetFields(["verificationCode", "password"]))
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
            loading={asyncStatus.resetPassword === "pending"}
          >Next</Button>
        }
      >
        <Container header={<Header variant="h2">Reset password</Header>}>
          <SpaceBetween size="l">
            <BaseForm handleSubmit={handleSubmit}>
              <SpaceBetween size="l">
                <FormField
                  label="Verification code"
                  description="We've sent a verification code to your email address. Please wait up to 5 minutes for it to arrive and enter it below."
                >
                  <SpaceBetween
                    size="l"
                    direction="vertical"
                  >
                    <Input
                      value={verificationCode}
                      onChange={({ detail }) => {
                        appDispatch(mainActions.updateSlice({ verificationCode: detail.value }))
                      }}
                      autoFocus
                      placeholder="Enter value"
                      type="number"
                    />
                    <Link onFollow={handleResendVerification}>Resend verification code</Link>
                  </SpaceBetween>
                </FormField>
                <FormField
                  label="New password"
                  errorText={errorMessages.newPassword}
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
          </SpaceBetween>
        </Container>
      </Form>
    </ContentLayout>
  )
}
