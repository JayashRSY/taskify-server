import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Board document
interface IBoard extends Document {
    name: string;
    description?: string;
    columns?: any;
    createdBy: string;
    updatedBy?: string;
}

// Mongoose schema for a Board
const BoardSchema: Schema = new Schema<IBoard>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
    }],
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
    },
}, { timestamps: true });

const BoardModel = mongoose.model<IBoard>('Board', BoardSchema);
export default BoardModel
