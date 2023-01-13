import UserModel from "../Models/user.model.js"

const userExists = async(mail) => {
    try {
        const user = await UserModel.find({ mail });
        if(user.length)
           return true;
        else
            return false;
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
}

export default userExists;