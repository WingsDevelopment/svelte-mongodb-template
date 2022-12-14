import BlogStore from '$lib/store/BlogStore';
import createNewGuid from '$lib/wrappers/createNewGuid';
import { type Blog, getNoteById, type CodeBlogContentRow } from './Blog';

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

export const createImageRowCommand = (imageUrl: string) => {
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

export const createVideoRowCommand = (videoUrl: string) => {
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

export const createEmbedRow = (embedUrl: string) => {
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

export const createSeparatorRowCommand = () => {
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
