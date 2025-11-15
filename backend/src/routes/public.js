import { Router } from "express";

import { getPublicWishlist } from "../controllers/favoritesController.js";
import {
  callbackRequestValidators,
  createCallbackRequest,
} from "../controllers/callbackController.js";
import { optionalAuthenticate } from "../middleware/auth.js";

const router = Router();

router.get("/wishlist/:token", getPublicWishlist);
router.post("/callback-request", optionalAuthenticate, callbackRequestValidators, createCallbackRequest);

export default router;








