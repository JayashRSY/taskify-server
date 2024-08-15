"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUsers = async (req, res, next) => {
    if (req.user?.role === "admin") {
        const allUsers = await userModel_1.default.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
            success: true,
            message: "Users fetched successfully",
            data: allUsers,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "User id is required"
        });
    }
    if (req.user?._id === id) {
        const user = await userModel_1.default.findById(id).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getUser = getUser;
const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "User id is required"
        });
    }
    if (req.user?._id === id) {
        const user = await userModel_1.default.findByIdAndDelete(id).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "User deleted successfully",
            data: user,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res, next) => {
    const { name, email, profilePicture, password } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required",
        });
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        });
    }
    if (req.user?._id) {
        try {
            const user = await userModel_1.default.findByIdAndUpdate(req.user._id, { name, email, profilePicture, password }, { new: true });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "No user found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user,
            });
        }
        catch (error) {
            next(error); // Forward the error to the error handling middleware
        }
    }
    else {
        return res.status(402).json({
            success: false,
            message: "Unauthorized",
        });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map