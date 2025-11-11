import { Router } from "express";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
  addFavoriteValidators,
  removeFavoriteValidators,
  shareWishlist,
} from "../controllers/favoritesController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post("/", addFavoriteValidators, addFavorite);
router.get("/", getFavorites);
router.post("/share", shareWishlist);
router.delete("/:product_id", removeFavoriteValidators, removeFavorite);

export default router;

