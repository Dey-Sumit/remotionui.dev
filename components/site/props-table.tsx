"use client"

import { Table } from "@heroui/react"
import type { CatalogProp } from "@/components/site/catalog"

export function PropsTable({ props }: { props: CatalogProp[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Component props" className="min-w-[640px]">
          <Table.Header>
            <Table.Column isRowHeader>Prop</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Default</Table.Column>
            <Table.Column>Description</Table.Column>
          </Table.Header>
          <Table.Body>
            {props.map((p) => (
              <Table.Row key={p.name}>
                <Table.Cell className="font-mono text-xs">{p.name}</Table.Cell>
                <Table.Cell className="font-mono text-xs text-muted">{p.type}</Table.Cell>
                <Table.Cell className="font-mono text-xs text-muted">
                  {p.default}
                </Table.Cell>
                <Table.Cell className="text-sm text-muted">{p.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
