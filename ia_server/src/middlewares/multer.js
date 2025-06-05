export const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Tipo de arquivo não permitido'), false)
    }
    cb(null, true)
}