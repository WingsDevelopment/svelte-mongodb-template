export interface Blog {
	id: number;
	activeFrom: Date;
	isPublished: boolean;
	updatedAt: Date;
	content: BlogContent;
	previewImageUrl: string;
	tags: string[]; //tag
	header: string;
	user: string; // user
	isPremium: boolean;
}

export const blogCtr = () => ({
	id: 0,
	activeFrom: new Date(),
	isPublished: false,
	updatedAt: new Date(),
	content: {
		rows: [
			{
				id: '1',
				text: 'Tell us your story. . .'
			}
		],
		notesHolder: []
	},
	previewImageUrl: '',
	tags: [],
	header: '',
	user: '',
	isPremium: false
});

export enum BlogContentRowType {
	Image,
	Video,
	Embed,
	Code,
	Separator
}

export interface BlogContent {
	rows: BlogContentRow[];
	notesHolder: BlogContentNote[];
}

export interface BlogContentRow {
	id: string;
	text: string;
	item?: BlogContentRowItemType;
}

export type BlogContentRowItemType =
	| ImageBlogContentItem
	| VideoBlogContentItem
	| EmbedBlogContentItem
	| CodeBlogContentItem
	| SeparatorBlogContentItem;

export interface BaseRowItem {
	type: BlogContentRowType;
}
export interface ImageBlogContentItem extends BaseRowItem {
	type: BlogContentRowType.Image;
	imageUrl: string;
}

export interface VideoBlogContentItem extends BaseRowItem {
	type: BlogContentRowType.Video;
	videoUrl: string;
}

export interface EmbedBlogContentItem extends BaseRowItem {
	type: BlogContentRowType.Embed;
	embedUrl: string;
}

export interface CodeBlogContentItem extends BaseRowItem {
	type: BlogContentRowType.Code;
	code: string;
}

export interface SeparatorBlogContentItem extends BaseRowItem {
	type: BlogContentRowType.Separator;
}

export interface BlogContentNote {
	id: string;
	text: string;
	createdAt: Date;
	comments: BlogContentNoteComment[];
}

export interface BlogContentNoteComment {
	id: string;
	createdAt: Date;
	text: string;
}

export const publish = (blog: Blog, activeFrom: Date) => {
	const scBlog = { ...blog };
	scBlog.activeFrom = activeFrom;
	scBlog.isPublished = true;
	return scBlog;
};

export const addTags = (blog: Blog, tags: string[]) => {
	const scBlog = { ...blog };
	scBlog.tags = [...scBlog.tags, ...tags];
	return scBlog;
};

export const addPreviewImage = (blog: Blog, previewImageUrl: string) => {
	const scBlog = { ...blog };
	scBlog.previewImageUrl = previewImageUrl;
	return scBlog;
};

//-----------------------------------------//

export const removeRow = (blog: Blog, rowId: string) => {
	const scBlog = { ...blog };
	scBlog.content.rows = scBlog.content.rows.filter((x) => x.id !== rowId);
	return scBlog;
};

export const removeItemFromRow = (blog: Blog, rowId: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');
	if (!row.item) throw new Error('Row has no item');

	row.item = undefined;
	return scBlog;
};

export const addCodeRow = (blog: Blog, rowId: string, code: string) => {
	const scBlog = { ...blog };

	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');

	row.item = {
		type: BlogContentRowType.Code,
		code
	};

	return scBlog;
};

export const updateCodeRow = (blog: Blog, rowId: string, code: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row?.item) throw new Error('Row | Item not found');
	if (row.item?.type !== BlogContentRowType.Code) throw new Error('Item is not of type code');

	row.item.code = code;
	return scBlog;
};

export const addTextRow = (blog: Blog, newRowId: string, text: string) => {
	const scBlog = { ...blog };

	scBlog.content.rows.push({
		id: newRowId,
		text
	});

	return {
		scBlog,
		newRowId
	};
};

export const updateTextRow = (blog: Blog, rowId: string, text: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');
	if (row.item !== undefined) throw new Error('Row has item');

	row.text = text;
	return scBlog;
};

export const addImageRow = (blog: Blog, rowId: string, imageUrl: string) => {
	const scBlog = { ...blog };

	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');

	row.item = {
		type: BlogContentRowType.Image,
		imageUrl
	};

	return scBlog;
};

export const updateImageRow = (blog: Blog, rowId: string, imageUrl: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row?.item) throw new Error('Row | item not found');
	if (row.item.type !== BlogContentRowType.Image) throw new Error('Item is not of type image');

	row.item.imageUrl = imageUrl;
	return scBlog;
};

export const addVideoRow = (blog: Blog, rowId: string, videoUrl: string) => {
	const scBlog = { ...blog };

	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');

	row.item = {
		type: BlogContentRowType.Video,
		videoUrl
	};

	return scBlog;
};

export const updateVideoRow = (blog: Blog, rowId: string, videoUrl: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row?.item) throw new Error('Row | item not found');
	if (row.item.type !== BlogContentRowType.Video) throw new Error('Item is not of type video');

	row.item.videoUrl = videoUrl;
	return scBlog;
};

export const addEmbedRow = (blog: Blog, rowId: string, embedUrl: string) => {
	const scBlog = { ...blog };

	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');

	row.item = {
		type: BlogContentRowType.Embed,
		embedUrl
	};

	return scBlog;
};

export const updateEmbedRow = (blog: Blog, rowId: string, embedUrl: string) => {
	const scBlog = { ...blog };
	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row?.item) throw new Error('Row | item not found');
	if (row.item.type !== BlogContentRowType.Embed) throw new Error('Item is not of type embed');

	row.item.embedUrl = embedUrl;
	return scBlog;
};

export const addSeparatorRow = (blog: Blog, rowId: string) => {
	const scBlog = { ...blog };

	const row = scBlog.content.rows.find((x) => x.id === rowId);
	if (!row) throw new Error('Row not found');

	row.item = {
		type: BlogContentRowType.Separator
	};

	return scBlog;
};

export const addNote = (blog: Blog, newNoteId: string, text: string) => {
	const scBlog = { ...blog };

	scBlog.content.notesHolder.push({
		id: newNoteId,
		text,
		createdAt: new Date(),
		comments: []
	});
	return {
		scBlog,
		newNoteId
	};
};

export const updateNote = (blog: Blog, noteId: string, text: string) => {
	const scBlog = { ...blog };
	const note = scBlog.content.notesHolder.find((x) => x.id === noteId);
	if (!note) throw new Error('Note not found');

	note.text = text;
	return scBlog;
};

export const removeNote = (blog: Blog, noteId: string) => {
	const scBlog = { ...blog };

	const noteIndex = scBlog.content.notesHolder.findIndex((x) => x.id === noteId);
	if (noteIndex === -1) throw new Error('Note not found');

	scBlog.content.notesHolder.splice(noteIndex, 1);
	return scBlog;
};

export const getNoteById = (blog: Blog, noteId: string) => {
	const note = blog.content.notesHolder.find((x) => x.id === noteId);
	if (!note) throw new Error('Note not found');

	return note;
};

export const addComment = (blog: Blog, newCommentId: string, noteId: string, text: string) => {
	const scBlog = { ...blog };
	const note = scBlog.content.notesHolder.find((x) => x.id === noteId);
	if (!note) throw new Error('Note not found');

	note.comments.push({
		id: newCommentId,
		text,
		createdAt: new Date()
	});
	return {
		scBlog,
		newCommentId
	};
};

export const updateComment = (blog: Blog, noteId: string, commentId: string, text: string) => {
	const scBlog = { ...blog };
	const note = scBlog.content.notesHolder.find((x) => x.id === noteId);
	if (!note) throw new Error('Note not found');

	const comment = note.comments.find((x) => x.id === commentId);
	if (!comment) throw new Error('Comment not found');

	comment.text = text;
	return scBlog;
};

export const removeComment = (blog: Blog, noteId: string, commentId: string) => {
	const scBlog = { ...blog };
	const note = scBlog.content.notesHolder.find((x) => x.id === noteId);
	if (!note) throw new Error('Note not found');

	const commentIndex = note.comments.findIndex((x) => x.id === commentId);
	if (commentIndex === -1) throw new Error('Comment not found');

	note.comments.splice(commentIndex, 1);
	return scBlog;
};
