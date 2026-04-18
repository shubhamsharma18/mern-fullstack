import jwt from 'jsonwebtoken'

export const userAuthMw = async (req, res, next) => {

    const token = req.cookies.myToken
    if (!token) {
        return res.status(400).json({
            message: "Please login"
        })
    }

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            "message": "Invalid Token"
        })
    }




}