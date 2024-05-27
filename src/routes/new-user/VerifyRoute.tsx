import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector, resendVerification, verifyUser } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Link from "@cloudscape-design/components/link"

export function Component() {
  const navigate = useNavigate()
  const { verificationCode, email, asyncStatus } = useSelector(mainSelector)

  useEffect(() => {
    if (!email) {
      navigate("/login")
    }
  }, [email])

  async function handleSubmit() {
    await appDispatch(verifyUser({ email, verificationCode }))
  }

  async function handleResendVerification() {
    await appDispatch(resendVerification({ email }))
  }

  useEffect(() => {
    if (asyncStatus.verifyUser === "fulfilled") {
      navigate("/new-user/complete")
    }
  }, [asyncStatus.verifyUser])

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
            loading={asyncStatus.verifyUser === "pending"}
          >Next</Button>
        }
      >
        <Container header={<Header variant="h2">Verify your email</Header>}>
          <SpaceBetween size="l">
            <form onSubmit={(e) => e.preventDefault()}>
              <SpaceBetween size="s">
                <FormField
                  label="Verification code"
                  description="We've sent a verification code to your email address. Please enter it below."
                >
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
            <Link onFollow={handleResendVerification}>Resend verification code</Link>
          </SpaceBetween>
        </Container>
      </Form>
    </ContentLayout>
  )
}
