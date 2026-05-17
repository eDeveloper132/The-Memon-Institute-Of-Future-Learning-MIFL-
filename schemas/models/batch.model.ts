     import mongoose, { Schema } from 'mongoose';
    
     const batchSchema = new Schema({
         name: { type: String, required: true, unique: true },
         startYear: { type: Number, required: true },
         endYear: { type: Number, required: true },
         isActive: { type: Boolean, default: true }
     }, { timestamps: true });
    
    export const Batch = mongoose.model('Batch', batchSchema);