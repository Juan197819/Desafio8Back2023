import { Router } from "express"
import { routerProducts } from "./routerProducts.js";
import { routerCarts } from "./routerCarts.js";
import { routerViews } from "./routerViews.js";
import { routerSessions } from "./routerSessions.js";

const router= Router()
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)
router.use('/api/sessions', routerSessions)
router.use('/', routerViews)

export default router