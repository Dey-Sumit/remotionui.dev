"use client"

import {
  Alert,
  Button,
  Card,
  Chip,
  Description,
  Input,
  Kbd,
  Label,
  Modal,
  Popover,
  Switch,
  Tabs,
  TextField,
  Tooltip,
} from "@heroui/react"
import { Icon } from "@iconify/react"
import { SiteNavbar } from "@/components/site/site-navbar"

/**
 * Glass theme showcase. The glass preset makes surfaces 70-80% opaque and adds
 * backdrop blur, so it is only visible over something colourful. The blobs below
 * exist purely to give the surfaces something to blur.
 */
export function ThemeShowcase() {
  return (
    <>
      <SiteNavbar />
      <main className="relative isolate mx-auto w-full max-w-5xl px-5 pt-12 pb-24 sm:px-8">
        <Blobs />

        <header className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">Glass theme</h1>
          <p className="max-w-2xl text-muted">
            Every surface here is semi-transparent with a backdrop blur. Drag the page
            over the colour blobs, open the popover and modal, and toggle the theme in the
            navbar.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Card.Header>
              <Card.Title>Card</Card.Title>
              <Card.Description>
                Surface at 80% opacity with blur. Note the blob colour bleeding through.
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger-soft">Delete</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip>
                  <Chip.Label>Default</Chip.Label>
                </Chip>
                <Chip color="accent" variant="soft">
                  <Chip.Label>Accent</Chip.Label>
                </Chip>
                <Chip color="success" variant="soft">
                  <Chip.Label>Success</Chip.Label>
                </Chip>
                <Chip color="warning" variant="soft">
                  <Chip.Label>Warning</Chip.Label>
                </Chip>
                <Chip color="danger" variant="soft">
                  <Chip.Label>Danger</Chip.Label>
                </Chip>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Fields</Card.Title>
              <Card.Description>Inputs pick up the glass field background.</Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-4">
              <TextField>
                <Label>Project name</Label>
                <Input placeholder="remotionui.dev" />
                <Description>Shown in the export file name.</Description>
              </TextField>
              <Switch defaultSelected>
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  Autoplay previews
                </Switch.Content>
              </Switch>
              <div className="flex items-center gap-2 text-sm text-muted">
                Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Tabs and overlays</Card.Title>
              <Card.Description>
                Tab list, popover and modal all blur whatever sits behind them.
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-5">
              <Tabs defaultSelectedKey="a">
                <Tabs.ListContainer className="w-fit">
                  <Tabs.List aria-label="Example tabs">
                    <Tabs.Tab id="a">
                      Overview
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="b">
                      Usage
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="c">
                      Props
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel id="a" className="pt-3 text-sm text-muted">
                  The selected indicator is itself a glass surface.
                </Tabs.Panel>
                <Tabs.Panel id="b" className="pt-3 text-sm text-muted">
                  Second panel.
                </Tabs.Panel>
                <Tabs.Panel id="c" className="pt-3 text-sm text-muted">
                  Third panel.
                </Tabs.Panel>
              </Tabs>

              <div className="flex flex-wrap gap-2">
                <Popover>
                  <Button variant="secondary">Open popover</Button>
                  <Popover.Content className="max-w-64">
                    <Popover.Dialog className="flex flex-col gap-1 p-3">
                      <Popover.Heading className="text-sm font-medium">Popover</Popover.Heading>
                      <p className="text-sm text-muted">
                        Overlay token at 75% opacity, blurred.
                      </p>
                    </Popover.Dialog>
                  </Popover.Content>
                </Popover>

                <Modal>
                  <Button variant="secondary">Open modal</Button>
                  <Modal.Backdrop isDismissable>
                    <Modal.Container size="sm">
                      <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Header>
                          <Modal.Heading>Glass modal</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                          <p className="text-sm text-muted">
                            The dialog blurs the page behind it and the backdrop dims it.
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button slot="close" variant="ghost">
                            Cancel
                          </Button>
                          <Button slot="close">Done</Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>

                <Tooltip delay={200}>
                  <Button isIconOnly variant="outline" aria-label="Info">
                    <Icon icon="gravity-ui:circle-info" className="size-4" />
                  </Button>
                  <Tooltip.Content>Tooltips are glass too</Tooltip.Content>
                </Tooltip>
              </div>
            </Card.Content>
          </Card>

          <div className="flex flex-col gap-4">
            <Alert>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Alert surface</Alert.Title>
                <Alert.Description>
                  Alerts share the card recipe: translucent background plus blur.
                </Alert.Description>
              </Alert.Content>
            </Alert>
            <Card variant="secondary">
              <Card.Header>
                <Card.Title>Secondary surface</Card.Title>
                <Card.Description>50% opacity. More of the background shows.</Card.Description>
              </Card.Header>
            </Card>
            <Card variant="tertiary">
              <Card.Header>
                <Card.Title>Tertiary surface</Card.Title>
                <Card.Description>70% opacity with a slight foreground tint.</Card.Description>
              </Card.Header>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
      <div className="absolute -top-10 left-[5%] size-[28rem] rounded-full bg-[#4f7cff] opacity-60 blur-3xl" />
      <div className="absolute top-[30%] right-[-5%] size-[26rem] rounded-full bg-[#ff5ea8] opacity-50 blur-3xl" />
      <div className="absolute bottom-[5%] left-[30%] size-[24rem] rounded-full bg-[#2ed3b7] opacity-50 blur-3xl" />
      <div className="absolute top-[55%] left-[-5%] size-[20rem] rounded-full bg-[#ffb340] opacity-45 blur-3xl" />
    </div>
  )
}
