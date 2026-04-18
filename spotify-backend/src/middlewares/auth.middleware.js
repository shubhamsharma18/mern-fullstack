import jwt from 'jsonwebtoken'

export const musicAuthMw = async (req, res, next) => {

    const token = req.cookies.myToken
    if (!token) {
        return res.status(400).json({
            message: "You are not authorized for this"
        })
    }

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.role !== "artist") return res.status(400).json({ "message": "Not Authorized" })
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({
            "message": "Invalid Token"
        })
    }




}