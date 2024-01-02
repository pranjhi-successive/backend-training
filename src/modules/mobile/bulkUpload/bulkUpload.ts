import { model, Schema, Document } from 'mongoose';

interface BulkUpload extends Document {
  startTime: Date;
  endTime: Date;
  numberOfItems: number;
}
// to add upload time, csv file name ,successfull entries,  error entries,csv file size
const bulkUploadSchema = new Schema<BulkUpload>(
    {
        startTime: { type: Date, required: true },
        endTime: { type: Date },
        numberOfItems: { type: Number, required: true },
    },
    { timestamps: true },
);

const BulkUploadModel = model<BulkUpload>('BulkUpload', bulkUploadSchema);

export default BulkUploadModel;
