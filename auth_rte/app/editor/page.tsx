import { CardWrapper } from '@/components/auth/card-wrapper'
import { RichTextEditor } from '@/components/tiptap/rich-text-editor'

export default function EditorPage() {
	return (
		<CardWrapper className="w-11/12 min-h-11/12 max-h-11/12">
			<RichTextEditor className="border-0 max-h-9/12" />
		</CardWrapper>
	)
}
