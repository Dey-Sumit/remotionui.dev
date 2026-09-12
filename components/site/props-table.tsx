"use client"

import { Table } from "@heroui/react"
import type { CatalogProp } from "@/components/site/catalog"

/**
 * Name and type share a cell, stacked. A docs column is ~620px wide once the
 * sidebar and the outline rail take their share, and these type unions are long
 * enough that four columns either wrap to three lines each or clip.
 */
export function PropsTable({ props }: { props: CatalogProp[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Component props" className="min-w-[480px]">
          <Table.Header>
            <Table.Column isRowHeader>Prop</Table.Column>
            <Table.Column>Default</Table.Column>
            <Table.Column>Description</Table.Column>
          </Table.Header>
          <Table.Body>
            {props.map((p) => (
              <Table.Row key={p.name}>
                <Table.Cell className="align-top">
                  <span className="block font-mono text-xs text-foreground">
                    {p.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted">
                    {p.type}
                  </span>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap align-top font-mono text-xs text-muted">
                  {p.default}
                </Table.Cell>
                <Table.Cell className="align-top text-sm text-muted">
                  {p.description}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
