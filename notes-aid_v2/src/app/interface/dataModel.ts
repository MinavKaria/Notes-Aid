import mongoose from 'mongoose';
import { MongoConnection } from '@/types/api';

const getDataModel = (mongooseInstance: MongoConnection) => {
    const DataSchema = new mongoose.Schema({
        seat_number: String,
        name: String,
        admission_year: Number,
        sgpa_list: [{
            semester: Number,
            sgpa: Number
        }],
        avg_cgpa: Number
    }, { 
        strict: false
    });

    return mongooseInstance.models.data || mongooseInstance.model('data', DataSchema, 'data');
};

export default getDataModel;
