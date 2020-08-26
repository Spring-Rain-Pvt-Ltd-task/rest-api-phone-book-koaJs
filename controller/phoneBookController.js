import PhoneBook from '../model/PhoneBook';
import validator from '../validators/PhoneBookValidator';


class PhoneBookController {

    /**
     * Get all contacts
     * @param     {object}  ctx
     * @return    {json} mixed
     */
    static async findAll(ctx) {
        try {
            const contacts = await PhoneBook.find();
            if (contacts.length === 0) throw new Error("Data not found")
            ctx.status = 200;
            ctx.body = contacts;
        } catch (error) {
            ctx.status = 404;
            ctx.body = error ? error.message : error
        }
    }

    /**
     * Get single contact by mobile number
     * @param     {object}  ctx.param
     * @return    {json} mixed
     */
    static async findByMobile(ctx) {
        const { mobile } = ctx.params;
        try {
            const phoneBook = await PhoneBook.find({ mobile });
            if (!phoneBook || phoneBook.length === 0) {
                ctx.status = 404
                throw new Error("Phone number does not exist")
            }
            ctx.status = 200;
            ctx.body = phoneBook;
        } catch (error) {
            ctx.body = error ? error.message : error
        }
    }

    /**
     * Create phone contact
     * @param     {object}  ctx.params
     * @return    {json} mixed
     */
    static async create(ctx) {
        const { body, body: { name, mobile } } = ctx.request;
        const validate = validator(body);
        try {
            const exist = await PhoneBook.find({ mobile });
            if (!validate.isValid) {
                ctx.status = 400;
                ctx.body = validate.error;
            } else if (exist.length > 0) {
                ctx.status = 400;
                ctx.body = 'Mobile number is already exists in your phone book';
            } else {
                const phoneBook = new PhoneBook({
                    name,
                    mobile
                });
                const user = await phoneBook.save();
                ctx.status = 201;
                ctx.body = user;
            }

        } catch (error) {
            ctx.body = error ? error.message : error;
        }
    }

    /**
     * Update phone book contact
     * @param     {object}  ctx.params
     * @return    {json} mixed
     */
    static async update(ctx) {
        const { id } = ctx.params;
        const { body, body: { name, mobile } } = ctx.request;
        const validate = validator(body);
        if (!validate.isValid) {
            ctx.status = 400;
            ctx.body = validate.error;
        } else {
            const phoneBook = await PhoneBook.findOneAndUpdate({ _id: id }, { $set: { name, mobile } });
            if (phoneBook) {
                ctx.status = 200;
                ctx.body = phoneBook;
            } else {
                ctx.status = 400;
                ctx.body = 'Contact doesn\'t exist in the phone book';
            }
        }

    }

    /**
     * Delete from phone book contact
     * @param     {object}  ctx.params
     * @return    {json} mixed
     */
    static async remove(ctx) {
        const { id } = ctx.params;
        const phoneBook = await PhoneBook.findOneAndDelete({ _id: id });
        if (phoneBook) {
            ctx.status = 200;
            ctx.body = phoneBook;
        } else {
            ctx.status = 400;
            ctx.body = 'Contact doesn\'t exist in the phone book';
        }
    }
}

export default PhoneBookController;