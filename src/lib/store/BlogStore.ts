import {
	type Blog,
	removeRow,
	addCodeRow as addCodeRowItem,
	updateCodeRow as updateCodeRowItem,
	addTextRow,
	updateTextRow,
	addImageRow,
	updateImageRow,
	addVideoRow,
	updateVideoRow,
	addEmbedRow,
	updateEmbedRow,
	addSeparatorRow,
	addNote,
	updateNote,
	addComment,
	removeNote,
	updateComment,
	blogCtr,
	removeComment,
	removeItemFromRow
} from '$lib/models/Blog';
import { writable } from 'svelte/store';

const emptyBlog = blogCtr();
const { subscribe, update } = writable<Blog>({ ...emptyBlog });
const BlogStore = {
	subscribe,
	removeRow: (rowId: string) => update((blog) => (blog = removeRow(blog, rowId))),
	removeItemFromRow: (rowId: string) => update((blog) => (blog = removeItemFromRow(blog, rowId))),
	addCodeRowItem: (rowId: string, code: string) =>
		update((blog) => {
			return addCodeRowItem(blog, rowId, code);
		}),
	updateCodeRowItem: (rowId: string, code: string) =>
		update((blog) => (blog = updateCodeRowItem(blog, rowId, code))),
	addTextRow: (newRowId: string, text: string) =>
		update((blog) => {
			const { scBlog } = addTextRow(blog, newRowId, text);
			blog = scBlog;
			return blog;
		}),
	updateTextRow: (rowId: string, text: string) =>
		update((blog) => (blog = updateTextRow(blog, rowId, text))),
	updateRowText: (rowId: string, text: string) =>
		update((blog) => (blog = updateTextRow(blog, rowId, text))),
	addImageRowItem: (rowId: string, imageUrl: string) =>
		update((blog) => {
			return addImageRow(blog, rowId, imageUrl);
		}),
	updateImageRowItem: (rowId: string, imageUrl: string) =>
		update((blog) => (blog = updateImageRow(blog, rowId, imageUrl))),
	addVideoRowItem: (rowId: string, videoUrl: string) =>
		update((blog) => {
			return addVideoRow(blog, rowId, videoUrl);
		}),
	updateVideoRowItem: (rowId: string, videoUrl: string) =>
		update((blog) => (blog = updateVideoRow(blog, rowId, videoUrl))),
	addEmbedRowItem: (rowId: string, embedUrl: string) =>
		update((blog) => {
			return addEmbedRow(blog, rowId, embedUrl);
		}),
	updateEmbedRowItem: (rowId: string, embedUrl: string) =>
		update((blog) => (blog = updateEmbedRow(blog, rowId, embedUrl))),
	addSeparatorRowItem: (rowId: string) =>
		update((blog) => {
			return addSeparatorRow(blog, rowId);
		}),
	addNote: (newNoteId: string, text: string) =>
		update((blog) => {
			const { scBlog } = addNote(blog, newNoteId, text);
			blog = scBlog;
			return blog;
		}),
	updateNoteText: (noteId: string, text: string) =>
		update((blog) => (blog = updateNote(blog, noteId, text))),
	removeNote: (noteId: string) => update((blog) => (blog = removeNote(blog, noteId))),
	addComment: (newCommentId: string, noteId: string, text: string) =>
		update((blog) => {
			const { scBlog } = addComment(blog, newCommentId, noteId, text);
			blog = scBlog;
			return blog;
		}),
	updateComment: (noteId: string, commentId: string, text: string) =>
		update((blog) => (blog = updateComment(blog, noteId, commentId, text))),
	removeComment: (noteId: string, commentId: string) =>
		update((blog) => (blog = removeComment(blog, noteId, commentId))),
	reset: () =>
		update((blog) => {
			blog = { ...emptyBlog };
			return blog;
		})
};
export default BlogStore;
