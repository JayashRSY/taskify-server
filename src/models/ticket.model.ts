import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Ticket document
interface ITicket extends Document {
    title: string;
    description?: string;
    status: 'to-do' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    labels?: string[];
    assignee?: string;
    boardId: mongoose.Types.ObjectId;
    columnId: mongoose.Types.ObjectId;
    createdBy: string;
    updatedBy?: string;
}

// Mongoose schema for a Ticket
const TicketSchema: Schema = new Schema<ITicket>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'done'],
        default: 'to-do',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
    },
    labels: {
        type: [String],
        default: [],
    },
    assignee: {
        type: String,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
    },
}, { timestamps: true });

const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema);
export default TicketModel
