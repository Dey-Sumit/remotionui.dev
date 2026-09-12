"use client"

import { CodeBlock } from "@heroui-pro/react/code-block"

export default function CodeView({ code, fileName }: { code: string; fileName: string }) {
  return (
    <CodeBlock className="max-h-[32rem] overflow-auto">
      <CodeBlock.Header>
        <span className="font-mono text-xs text-muted">{fileName}</span>
        <CodeBlock.CopyButton code={code} aria-label="Copy source" />
      </CodeBlock.Header>
      <CodeBlock.Code code={code} language="tsx" />
    </CodeBlock>
  )
}
