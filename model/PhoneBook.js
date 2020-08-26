import mongoose from 'mongoose';

const PhoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema);
export default PhoneBook;