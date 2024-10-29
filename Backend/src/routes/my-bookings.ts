import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Services from "../models/services";
import { ServicesType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const services = await Services.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = services.map((services) => {
      const userBookings = services.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: ServicesType = {
        ...services.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;