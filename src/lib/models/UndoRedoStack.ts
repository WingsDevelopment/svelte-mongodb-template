import createNewGuid from '$lib/wrappers/createNewGuid';
import {
	type Blog,
	getNoteById,
	type BlogContentNote,
	type BlogContentNoteComment,
	type BlogContentRow,
	BlogContentRowType
} from '$lib/models/Blog';
import BlogStore from '$lib/store/BlogStore';

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
	// console.log('stack.undoStack');
	// console.log(stack.undoStack);
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

export const createAddCodeRowItemCommand = (rowId: string, code: string) => {
	return {
		rowId,
		code,
		execute: () => {
			BlogStore.addCodeRowItem(rowId, code);
		},
		undo: () => {
			BlogStore.removeItemFromRow(rowId);
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

export const createAddImageRowItemCommand = (rowId: string, imageUrl: string) => {
	return {
		rowId,
		imageUrl,
		execute: () => {
			BlogStore.addImageRowItem(rowId, imageUrl);
		},
		undo: () => {
			BlogStore.removeItemFromRow(rowId);
		}
	};
};

export const createAddVideoRowItemCommand = (rowId: string, videoUrl: string) => {
	return {
		rowId,
		videoUrl,
		execute: () => {
			BlogStore.addVideoRowItem(rowId, videoUrl);
		},
		undo: () => {
			BlogStore.removeItemFromRow(rowId);
		}
	};
};

export const createAddEmbedRowItemCommand = (rowId: string, embedUrl: string) => {
	return {
		rowId,
		embedUrl,
		execute: () => {
			BlogStore.addEmbedRowItem(rowId, embedUrl);
		},
		undo: () => {
			BlogStore.removeItemFromRow(rowId);
		}
	};
};

export const createAddSeparatorRowItemCommand = (rowId: string) => {
	return {
		rowId,
		execute: () => {
			BlogStore.addSeparatorRowItem(rowId);
		},
		undo: () => {
			BlogStore.removeItemFromRow(rowId);
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

export const createRemoveCodeRowItemCommand = (row: BlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeItemFromRow(row.id);
		},
		undo: () => {
			if (row?.item?.type !== BlogContentRowType.Code)
				throw new Error('Row item is not a code item');
			BlogStore.addCodeRowItem(row.id, row?.item?.code);
		}
	};
};

export const createRemoveTextRowCommand = (row: BlogContentRow) => {
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

export const createUpdateTextRowCommand = (row: BlogContentRow, text: string) => {
	const oldText = row.text;
	return {
		row,
		text,
		execute: () => {
			BlogStore.updateRowText(row.id, text);
		},
		undo: () => {
			BlogStore.updateRowText(row.id, oldText);
		}
	};
};

export const createRemoveImageRowCommand = (row: BlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			if (row?.item?.type !== BlogContentRowType.Image)
				throw new Error('Row item is not an image item');
			BlogStore.addImageRowItem(row.id, row?.item?.imageUrl);
		}
	};
};

export const createRemoveVideoRowCommand = (row: BlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			if (row?.item?.type !== BlogContentRowType.Video)
				throw new Error('Row item is not a video item');
			BlogStore.addVideoRowItem(row.id, row?.item?.videoUrl);
		}
	};
};

export const createRemoveEmbedRowCommand = (row: BlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			if (row?.item?.type !== BlogContentRowType.Embed)
				throw new Error('Row item is not an embed item');
			BlogStore.addEmbedRowItem(row.id, row?.item?.embedUrl);
		}
	};
};

export const createRemoveSeparatorRowCommand = (row: BlogContentRow) => {
	return {
		row,
		execute: () => {
			BlogStore.removeRow(row.id);
		},
		undo: () => {
			BlogStore.addSeparatorRowItem(row.id);
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
