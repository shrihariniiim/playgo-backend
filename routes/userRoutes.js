import express from 'express';
const router = express.Router();
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';
//only admin  access this router
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({message:" welcome Admin "});
});

//both admin and manager can access this router
router.get('/manager', verifyToken, authorizeRoles('admin', 'manager'), (req, res) => {
    res.json({message:" welcome Manager "});
});

//All can access this router
router.get('/user', verifyToken, authorizeRoles('admin', 'manager', 'user'), (req, res) => {
    res.json({message:" welcome User "});
});

export default router;