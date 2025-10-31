import mongoose from 'mongoose';

function connectToDb() {
    mongoose.connect(process.env.MONGODB_URI
    ).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => console.log(err));
}

export default connectToDb;