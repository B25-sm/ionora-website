import { Router } from "express";

import { getPublicWishlist } from "../controllers/favoritesController.js";

const router = Router();

router.get("/wishlist/:token", getPublicWishlist);

export default router;




