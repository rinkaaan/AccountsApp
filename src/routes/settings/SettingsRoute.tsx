import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from "@cloudscape-design/components"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { appDispatch } from "../../common/store.ts"
import { mainActions, mainSelector } from "../mainSlice.ts"
import Tools from "./Tools.tsx"

export function Component() {
  const { username: username0 } = useSelector(mainSelector)
  const [username, setUsername] = useState<string>(username0)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    appDispatch(mainActions.updateSlice({ tools: <Tools />, toolsHidden: false }))
    return () => {
      appDispatch(mainActions.updateSlice({ toolsHidden: true }))
    }
  }, [])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Settings</Header>
      }
    >
      <Form
        actions={
          <SpaceBetween size="xs" direction="horizontal">
            <Button
              variant="link"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!changed}
            >Save changes</Button>
          </SpaceBetween>
        }
      >
        <SpaceBetween size="l">
          <Container header={<Header variant="h2">Language</Header>}>
            <form onSubmit={(e) => e.preventDefault()}>
              <SpaceBetween size="s">
                <FormField label="Source language">
                </FormField>
              </SpaceBetween>
            </form>
          </Container>
          <Container header={<Header variant="h2">Profile</Header>}>
            <FormField label="Username">
              <Input
                value={username}
                onChange={({ detail }) => {
                  setUsername(detail.value)
                  setChanged(true)
                }}
              />
            </FormField>
          </Container>
        </SpaceBetween>
      </Form>
    </ContentLayout>
  )
}
