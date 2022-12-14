import {
	type Blog,
	removeRow,
	addCodeRow,
	updateCodeRow,
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
	removeComment
} from '$lib/models/Blog';
import { writable } from 'svelte/store';

const emptyBlog = blogCtr();
const { subscribe, update } = writable<Blog>({ ...emptyBlog });
const BlogStore = {
	subscribe,
	removeRow: (rowId: string) => update((blog) => (blog = removeRow(blog, rowId))),
	addCodeRow: (newRowId: string, code: string) =>
		update((blog) => {
			const { scBlog } = addCodeRow(blog, newRowId, code);
			blog = scBlog;
			return blog;
		}),
	updateCodeRow: (rowId: string, code: string) =>
		update((blog) => (blog = updateCodeRow(blog, rowId, code))),
	addTextRow: (newRowId: string, text: string) =>
		update((blog) => {
			const { scBlog } = addTextRow(blog, newRowId, text);
			blog = scBlog;
			return blog;
		}),
	updateTextRow: (rowId: string, text: string) =>
		update((blog) => (blog = updateTextRow(blog, rowId, text))),
	addImageRow: (newRowId: string, imageUrl: string) =>
		update((blog) => {
			const { scBlog } = addImageRow(blog, newRowId, imageUrl);
			blog = scBlog;
			return blog;
		}),
	updateImageRow: (rowId: string, imageUrl: string) =>
		update((blog) => (blog = updateImageRow(blog, rowId, imageUrl))),
	addVideoRow: (newRowId: string, videoUrl: string) =>
		update((blog) => {
			const { scBlog } = addVideoRow(blog, newRowId, videoUrl);
			blog = scBlog;
			return blog;
		}),
	updateVideoRow: (rowId: string, videoUrl: string) =>
		update((blog) => (blog = updateVideoRow(blog, rowId, videoUrl))),
	addEmbedRow: (newRowId: string, embedUrl: string) =>
		update((blog) => {
			const { scBlog } = addEmbedRow(blog, newRowId, embedUrl);
			blog = scBlog;
			return blog;
		}),
	updateEmbedRow: (rowId: string, embedUrl: string) =>
		update((blog) => (blog = updateEmbedRow(blog, rowId, embedUrl))),
	addSeparatorRow: (newRowId: string) =>
		update((blog) => {
			const { scBlog } = addSeparatorRow(blog, newRowId);
			blog = scBlog;
			return blog;
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
