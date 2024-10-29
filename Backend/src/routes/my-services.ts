import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Services from "../models/services";
import { ServicesType } from "../shared/types"
import { body } from "express-validator";
import verifyToken from "../middleware/auth";
import services from "../models/services";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });

  router.post(
    "/",
    verifyToken,
  [
    body("businessName").notEmpty().withMessage("businessName is required"),
    body("contactPersonsName").notEmpty().withMessage("contactPersonsName is required"),
    body("fuelSurcharge").notEmpty().withMessage("fuelSurcharge is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Services type is required"),
    body("totalCosts")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per Kilometer is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
    upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newServices: ServicesType = req.body;
    

      const imageUrls = await uploadImages(imageFiles);
      newServices.imageUrls = imageUrls;
      newServices.lastUpdated = new Date();
      newServices.userId = req.userId;

      const services = new Services(newServices);
      await services.save();


      res.status(201).send(services);
     
    }  catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
      }
}
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const services = await Services.find({ userId: req.userId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const services = await Services.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

router.put(
  "/:servicesId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedServices: ServicesType = req.body;
      updatedServices.lastUpdated = new Date();

      const services = await Services.findOneAndUpdate(
        {
          _id: req.params.servicesId,
          userId: req.userId,
        },
        updatedServices,
        { new: true }
      );

      if (!services) {
        return res.status(404).json({ message: "Services not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      services.imageUrls = [
        ...updatedImageUrls,
        ...(updatedServices.imageUrls || []),
      ];

      await services.save();
      res.status(201).json(services);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;