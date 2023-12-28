import { Schema, model, Document } from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
}, { collection: "users" })

UserSchema.set('toJSON', {
    transform: (_document: Document, returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserModel = model("User", UserSchema)

export default UserModel