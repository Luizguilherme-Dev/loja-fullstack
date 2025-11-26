import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Multer em memória (não cria arquivo físico)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Nenhuma imagem enviada" });
    }

    // Upload direto do buffer
    const result = await cloudinary.uploader.upload_stream(
      { folder: "produtos" },
      (error, uploadResult) => {
        if (error) {
          return res.status(500).json({ success: false, error: "Erro no Cloudinary" });
        }

        return res.json({
          success: true,
          url: uploadResult.secure_url
        });
      }
    );

    // Envia o buffer
    result.end(req.file.buffer);

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Erro ao enviar imagem" });
  }
});

export default router;
