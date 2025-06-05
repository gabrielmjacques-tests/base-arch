import { Router } from 'express'
import multer from 'multer'
import * as controller from '../controllers/gemini.controller.js'
import { fileFilter } from '../middlewares/multer.js'
import { apenasDev } from '../middlewares/modes.js'

const router = Router()
const upload = multer({
    fileFilter
})

router.post('/descrever/imagem', upload.single('imagem'), controller.describeImage)

router.post('/config', apenasDev, controller.atualizarConfig)

export default router