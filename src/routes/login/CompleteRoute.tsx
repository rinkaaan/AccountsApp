import { Container, ContentLayout, Form, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { mainSelector } from "../mainSlice.ts"

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
          <Container header={<Header variant="h2">Login complete</Header>}>
            <TextContent>
              <p>You are now logged in.</p>
            </TextContent>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
