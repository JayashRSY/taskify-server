import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Column document
interface IColumn extends Document {
    title: string;
    description?: string;
    tasks: any;
    createdBy: string;
    updatedBy?: string;
}

// Mongoose schema for a Column
const ColumnSchema: Schema = new Schema<IColumn>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    createdBy: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
    },
}, { timestamps: true });

ColumnSchema.methods.toJSON = function () {
    const doc = this.toObject();
    delete doc.__v; // remove version key

    return doc;
};

const ColumnModel = mongoose.model<IColumn>('Column', ColumnSchema);
export default ColumnModel
