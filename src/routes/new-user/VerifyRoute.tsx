import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector } from "../mainSlice.ts"
import { appDispatch } from "../../common/store.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Component() {
  const navigate = useNavigate()
  const { verificationCode, email } = useSelector(mainSelector)

  useEffect(() => {
    if (!email) {
      navigate("/login")
    }
  }, [email])

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
        <Container header={<Header variant="h2">Verify your email</Header>}>
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
        </Container>
      </Form>
    </ContentLayout>
  )
}
