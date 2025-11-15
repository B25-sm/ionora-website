import { Router } from "express";

import {
  getProfile,
  updateProfile,
  profileValidators,
  getAddresses,
  createAddress,
  addressValidators,
  updateAddress,
  updateAddressValidators,
  deleteAddress,
  deleteAddressValidators,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/profile", getProfile);
router.put("/profile", profileValidators, updateProfile);
router.get("/addresses", getAddresses);
router.post("/address", addressValidators, createAddress);
router.put("/address/:id", updateAddressValidators, updateAddress);
router.delete("/address/:id", deleteAddressValidators, deleteAddress);

export default router;

