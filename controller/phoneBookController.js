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
            const contact = await PhoneBook.find({ mobile });
            if (!contact || contact.length === 0) {
                ctx.status = 404
                throw new Error("phone number does not exist")
            }
            ctx.status = 200;
            ctx.body = contact;
        } catch (error) {
            ctx.body = error ? error.message : error
        }
    }

    /**
     * Create contact
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
                ctx.body = 'Mobile number is already exists';
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
     * Update contact
     * @param     {object}  ctx.params
     * @return    {json} mixed
     */
    static async update(ctx) {
        const { mobile } = ctx.params;
        const { name, email } = ctx.request.body;
        const contact = await PhoneBook.findOneAndUpdate({ mobile }, { $set: { name, email } });
        if (contact) {
            ctx.status = 200;
            ctx.body = contact;
        } else {
            ctx.status = 400;
            ctx.body = 'Contact doesn\'t exist in the db';
        }
    }

    /**
     * Delete contact
     * @param     {object}  ctx
     * @return    {json} mixed
     */
    static async remove(ctx) {
        const { mobile } = ctx.params;
        const contact = await PhoneBook.findOneAndDelete({ mobile });
        if (contact) {
            ctx.status = 200;
            ctx.body = contact;
        } else {
            ctx.status = 400;
            ctx.body = 'Contact doesn\'t exist in the db';
        }
    }
}

export default PhoneBookController;