import { writable } from 'svelte/store';
import createNewGuid from '$lib/wrappers/createNewGuid';
import {
	type Blog,
	getNoteById,
	type CodeBlogContentRow,
	type BlogContentRow,
	BlogContentRowType,
	type TextBlogContentRow,
	type ImageBlogContentRow,
	type EmbedBlogContentRow,
	type VideoBlogContentRow,
	type SeparatorBlogContentRow,
	type BlogContentNote,
	type BlogContentNoteComment
} from '$lib/models/Blog';
import BlogStore from './BlogStore';

export interface Command {
	execute(): void;
	undo(): void;
}

export interface UndoRedoStack {
	undoStack: Command[];
	redoStack: Command[];
}

export const commandManagerCtr = (): UndoRedoStack => ({
	undoStack: [],
	redoStack: []
});

export const execute = (stack: UndoRedoStack, command: Command) => {
	const scStack = { ...stack };
	command.execute();
	scStack.undoStack.push(command);
	scStack.redoStack = [];

	return scStack;
};

export const undo = (stack: UndoRedoStack) => {
	const scStack = { ...stack };
	const command = stack.undoStack.pop();
	if (command) {
		command.undo();
		scStack.redoStack.push(command);
	}

	return scStack;
};

export const redo = (stack: UndoRedoStack) => {
	const scStack = { ...stack };
	const command = scStack.redoStack.pop();
	if (command) {
		command.execute();
		scStack.undoStack.push(command);
	}

	return scStack;
};

export const createAddCodeRowCommand = (code: string) => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		code,
		execute: () => {
			BlogStore.addCodeRow(newRowId, code);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createAddTextRowCommand = (text: string) => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		text,
		execute: () => {
			BlogStore.addTextRow(newRowId, text);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createAddImageRowCommand = (imageUrl: string) => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		imageUrl,
		execute: () => {
			BlogStore.addImageRow(newRowId, imageUrl);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createAddVideoRowCommand = (videoUrl: string) => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		videoUrl,
		execute: () => {
			BlogStore.addVideoRow(newRowId, videoUrl);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createAddEmbedRowCommand = (embedUrl: string) => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		embedUrl,
		execute: () => {
			BlogStore.addEmbedRow(newRowId, embedUrl);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createAddSeparatorRowCommand = () => {
	const newRowId = createNewGuid();

	return {
		rowId: newRowId,
		execute: () => {
			BlogStore.addSeparatorRow(newRowId);
		},
		undo: () => {
			BlogStore.removeRow(newRowId);
		}
	};
};

export const createUpdateNoteTextCommand = (blog: Blog, noteId: string, text: string) => {
	const oldNote = getNoteById(blog, noteId);

	return {
		noteId,
		text,
		oldNote,
		execute: () => {
			BlogStore.updateNoteText(noteId, text);
		},
		undo: () => {
			BlogStore.updateNoteText(noteId, oldNote.text);
		}
	};
};

export const createRemoveCodeRowCommand = (row: CodeBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addCodeRow(row.id, row.code);
		}
	};
};

export const createRemoveTextRowCommand = (row: TextBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addTextRow(row.id, row.text);
		}
	};
};

export const createRemoveImageRowCommand = (row: ImageBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addImageRow(row.id, row.imageUrl);
		}
	};
};

export const createRemoveVideoRowCommand = (row: VideoBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addVideoRow(row.id, row.videoUrl);
		}
	};
};

export const createRemoveEmbedRowCommand = (row: EmbedBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addEmbedRow(row.id, row.embedUrl);
		}
	};
};

export const createRemoveSeparatorRowCommand = (row: SeparatorBlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addSeparatorRow(row.id);
		}
	};
};

export const createAddNoteCommand = (note: string) => {
	const noteId = createNewGuid();

	return {
		noteId,
		note,
		execute: () => {
			BlogStore.addNote(noteId, note);
		},
		undo: () => {
			BlogStore.removeNote(noteId);
		}
	};
};

export const createRemoveNoteCommand = (note: BlogContentNote) => {
	return {
		note,
		execute: () => {
			BlogStore.removeNote(note.id);
		},
		undo: () => {
			BlogStore.addNote(note.id, note.text);
		}
	};
};

export const createUpdateNoteCommand = (note: BlogContentNote, text: string) => {
	return {
		text,
		note,
		oldTitle: text,
		execute: () => {
			BlogStore.updateNoteText(note.id, text);
		},
		undo: () => {
			BlogStore.updateNoteText(note.id, text);
		}
	};
};

export const createAddCommentCommand = (
	comment: BlogContentNoteComment,
	note: BlogContentNote,
	text: string
) => {
	const newCommentId = createNewGuid();

	return {
		text,
		comment,
		newCommentId,
		note,
		execute: () => {
			BlogStore.addComment(newCommentId, note.id, text);
		},
		undo: () => {
			BlogStore.removeComment(newCommentId, note.id);
		}
	};
};

export const createRemoveCommentCommand = (
	comment: BlogContentNoteComment,
	note: BlogContentNote
) => {
	return {
		comment,
		note,
		execute: () => {
			BlogStore.removeComment(comment.id, note.id);
		},
		undo: () => {
			BlogStore.addComment(comment.id, note.id, comment.text);
		}
	};
};

export const createUpdateCommentCommand = (
	comment: BlogContentNoteComment,
	note: BlogContentNote,
	text: string
) => {
	return {
		text,
		comment,
		note,
		oldText: comment.text,
		execute: () => {
			BlogStore.updateComment(comment.id, note.id, text);
		},
		undo: () => {
			BlogStore.updateComment(comment.id, note.id, comment.text);
		}
	};
};

const { subscribe, set, update } = writable<UndoRedoStack>(commandManagerCtr());

const CommandStore = {
	subscribe,
	execute: (command: Command) => update((stack) => (stack = execute(stack, command))),
	undo: () => update((stack) => (stack = undo(stack))),
	redo: () => update((stack) => (stack = redo(stack))),
	addCodeRowCommand: (code: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddCodeRowCommand(code);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeCodeRowCommand: (row: CodeBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveCodeRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addTextRowCommand: (text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddTextRowCommand(text);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeTextRowCommand: (row: TextBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveTextRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addImageRowCommand: (imageUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddImageRowCommand(imageUrl);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeImageRowCommand: (row: ImageBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveImageRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addEmbedRowCommand: (embedUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddEmbedRowCommand(embedUrl);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeEmbedRowCommand: (row: EmbedBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveEmbedRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addNoteCommand: (note: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddNoteCommand(note);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeNoteCommand: (note: BlogContentNote) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveNoteCommand(note);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	updateNoteCommand: (note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createUpdateNoteCommand(note, text);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddCommentCommand(comment, note, text);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveCommentCommand(comment, note);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	updateCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createUpdateCommentCommand(comment, note, text);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addSeparatorRowCommand: () =>
		update((stack: UndoRedoStack) => {
			const command = createAddSeparatorRowCommand();
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeSeparatorRowCommand: (row: SeparatorBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveSeparatorRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	addVideoRowCommand: (videoUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddVideoRowCommand(videoUrl);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeVideoRowCommand: (row: VideoBlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveVideoRowCommand(row);
			stack.undoStack.push(command);
			command.execute();
			return stack;
		}),
	removeRowCommand: (row: BlogContentRow) => {
		switch (row.type) {
			case BlogContentRowType.Code:
				return CommandStore.removeCodeRowCommand(row as CodeBlogContentRow);
			case BlogContentRowType.Text:
				return CommandStore.removeTextRowCommand(row as TextBlogContentRow);
			case BlogContentRowType.Image:
				return CommandStore.removeImageRowCommand(row as ImageBlogContentRow);
			case BlogContentRowType.Embed:
				return CommandStore.removeEmbedRowCommand(row as EmbedBlogContentRow);
			case BlogContentRowType.Separator:
				return CommandStore.removeSeparatorRowCommand(row as SeparatorBlogContentRow);
			case BlogContentRowType.Video:
				return CommandStore.removeVideoRowCommand(row as VideoBlogContentRow);
			default:
				throw new Error('Not implemented row type!');
		}
	},

	reset: () => set(commandManagerCtr())
};

export default CommandStore;
