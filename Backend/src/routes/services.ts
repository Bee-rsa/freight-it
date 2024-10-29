import express, { Request, Response, Router } from "express";
import Services from "../models/services";
import { BookingType, ServicesSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from 'stripe';
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {

try {
  const query = constructSearchQuery(req.query);

  let sortOptions = {};
    switch (req.query.sortOption) {
      case "AccessorialCharges":
        sortOptions = { AccessorialCharges: -1 };
        break;
      case "baseRateAsc":
        sortOptions = { baseRate: 1 };
        break;
      case "baseRateDesc":
        sortOptions = { baseRate: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : "1"
      );
      const skip = (pageNumber - 1) * pageSize;

    const services = await Services.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

    const total = await Services.countDocuments(query);

    const response: ServicesSearchResponse = {
        data: services,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      };

      res.json(response);

} catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "Something went wrong "});
}
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const services = await Services.findById(id);
      res.json(services);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching services" });
    }
  }
);

router.post(
  "/:servicesId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const servicesId = req.params.servicesId;

    const services = await Services.findById(servicesId);
    if (!services) {
      return res.status(400).json({ message: "Services not found" });
    }

    const totalCost = services.totalCosts * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "ZAR",
      metadata: {
        servicesId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  }
);

router.post(
  "/:servicesId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "payment intent not found" });
      }

      if (
        paymentIntent.metadata.servicesId !== req.params.servicesId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const services = await Services.findOneAndUpdate(
        { _id: req.params.servicesId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!services) {
        return res.status(400).json({ message: "services not found" });
      }

      await services.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const AccessorialCharges = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.AccessorialCharges = { $in: AccessorialCharges };
  }

  if (queryParams.maxPrice) {
    constructedQuery.baseRate = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;