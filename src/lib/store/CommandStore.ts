import {
	type BlogContentNote,
	type BlogContentNoteComment,
	type BlogContentRow,
	BlogContentRowType,
	type BaseRowItem
} from '$lib/models/Blog';
import {
	type UndoRedoStack,
	commandManagerCtr,
	type Command,
	execute,
	undo,
	redo,
	createAddCodeRowItemCommand,
	createRemoveCodeRowItemCommand,
	createAddTextRowCommand,
	createRemoveTextRowCommand,
	createAddImageRowItemCommand,
	createRemoveImageRowCommand,
	createAddEmbedRowItemCommand,
	createRemoveEmbedRowCommand as createRemoveEmbedRowItemCommand,
	createAddNoteCommand,
	createRemoveNoteCommand,
	createUpdateNoteCommand,
	createAddCommentCommand,
	createRemoveCommentCommand,
	createUpdateCommentCommand,
	createAddSeparatorRowItemCommand,
	createRemoveSeparatorRowCommand as createRemoveSeparatorRowItemCommand,
	createAddVideoRowItemCommand,
	createRemoveVideoRowCommand,
	createUpdateTextRowCommand
} from '$lib/models/UndoRedoStack';
import { writable } from 'svelte/store';

const { subscribe, set, update } = writable<UndoRedoStack>(commandManagerCtr());

const CommandStore = {
	subscribe,
	execute: (command: Command) => update((stack) => (stack = execute(stack, command))),
	undo: () => update((stack) => (stack = undo(stack))),
	redo: () => update((stack) => (stack = redo(stack))),
	addCodeRowItemCommand: (rowId: string, code: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddCodeRowItemCommand(rowId, code);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeCodeRowItemCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveCodeRowItemCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addTextRowCommand: (text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddTextRowCommand(text);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeTextRowCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveTextRowCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	updateTextRowCommand: (row: BlogContentRow, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createUpdateTextRowCommand(row, text);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addImageRowItemCommand: (rowId: string, imageUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddImageRowItemCommand(rowId, imageUrl);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeImageRowItemCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveImageRowCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addEmbedRowItemCommand: (rowId: string, embedUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddEmbedRowItemCommand(rowId, embedUrl);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeEmbedRowItemCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveEmbedRowItemCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addNoteCommand: (note: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddNoteCommand(note);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeNoteCommand: (note: BlogContentNote) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveNoteCommand(note);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	updateNoteCommand: (note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createUpdateNoteCommand(note, text);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddCommentCommand(comment, note, text);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveCommentCommand(comment, note);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	updateCommentCommand: (comment: BlogContentNoteComment, note: BlogContentNote, text: string) =>
		update((stack: UndoRedoStack) => {
			const command = createUpdateCommentCommand(comment, note, text);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addSeparatorRowItemCommand: (rowId: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddSeparatorRowItemCommand(rowId);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeSeparatorRowItemCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveSeparatorRowItemCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	addVideoRowItemCommand: (rowId: string, videoUrl: string) =>
		update((stack: UndoRedoStack) => {
			const command = createAddVideoRowItemCommand(rowId, videoUrl);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeVideoRowCommand: (row: BlogContentRow) =>
		update((stack: UndoRedoStack) => {
			const command = createRemoveVideoRowCommand(row);
			stack.undoStack.push(command);
			stack.redoStack = [];
			command.execute();
			return stack;
		}),
	removeRowItemCommand: (row: BlogContentRow, item: BaseRowItem) => {
		switch (item.type) {
			case BlogContentRowType.Code:
				return CommandStore.removeCodeRowItemCommand(row);
			case BlogContentRowType.Image:
				return CommandStore.removeImageRowItemCommand(row);
			case BlogContentRowType.Embed:
				return CommandStore.removeEmbedRowItemCommand(row);
			case BlogContentRowType.Separator:
				return CommandStore.removeSeparatorRowItemCommand(row);
			case BlogContentRowType.Video:
				return CommandStore.removeVideoRowCommand(row);
			default:
				throw new Error('Not implemented row type!');
		}
	},
	reset: () => set(commandManagerCtr())
};

export default CommandStore;
