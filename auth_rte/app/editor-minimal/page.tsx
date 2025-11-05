'use client'

import { MinimalTiptap } from '@/components/ui/shadcn-io/minimal-tiptap'
import { useState } from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'

export default function EditorPage() {
	const [content, setContent] = useState(`
    <h1>Welcome to Minimal Tiptap</h1>
    <p>This is a rich text editor built with Tiptap. Try editing this text!</p>
    <ul>
      <li>Use the toolbar to format text</li>
      <li>Try making text <strong>bold</strong> or <em>italic</em></li>
      <li>Create lists and headings</li>
    </ul>
    <blockquote>
      <p>This is a blockquote. Perfect for highlighting important information.</p>
    </blockquote>
  `)

	return (
		<CardWrapper className="w-11/12 min-h-11/12 max-h-11/12">
			<MinimalTiptap
				content={content}
				onChange={setContent}
				placeholder="Start typing your content here..."
				className="min-h-[400px]"
			/>
		</CardWrapper>
	)
}
