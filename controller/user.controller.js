import { userModel } from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { handleErrorDatabase } from "../data/errors.database.js";

const compare = (plainPasword, storedPassword) => {
    return plainPasword === storedPassword;
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.loginByEmail(email)

        if(!user) return res.status(400).json({
            ok: false,
            msg: "El email no está registrado"
        })

        const passwordIsValid = await compare(password, user.password)
        if (!passwordIsValid) return res.status(400).json({
            ok:false,
            msg: "contraseña incorrecta"
        })
        
        const token = jwt.sign(
            {email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '2m'}
        )
        return res.json({
            token,
            email: user.email
        })
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ok:false, msg})
    }
}

export const  userController = {
    login
}