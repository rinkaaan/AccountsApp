import { Container, ContentLayout, Form, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { mainSelector } from "../mainSlice.ts"
import { useSelector } from "react-redux"

export function Component() {
  const navigate = useNavigate()
  const { jwtToken } = useSelector(mainSelector)

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login")
    }
  }, [jwtToken])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Rinkagu</Header>
      }
    >
      <Form>
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Password reset complete</Header>}>
            <TextContent>
              <p>Your password has been successfully reset.</p>
            </TextContent>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
