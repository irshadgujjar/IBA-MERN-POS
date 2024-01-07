// router.js

const express = require("express");
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, getAllUsers, getUserByID, deleteUser, updateUser } = require("./controller");

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/getallusers', getAllUsers);
router.get('/getuserbyid', getUserByID);
router.delete('/deleteuser', deleteUser);
router.put('/updateuser', updateUser);

module.exports = router;
