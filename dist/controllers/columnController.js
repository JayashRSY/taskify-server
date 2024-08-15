"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateColumn = exports.deleteColumn = exports.getColumn = exports.getColumns = exports.createColumn = void 0;
const columnModel_1 = __importDefault(require("../models/columnModel"));
const createColumn = async (req, res, next) => {
    if (req.user?.role === "admin") {
        const allColumns = await columnModel_1.default.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
            success: true,
            message: "Columns fetched successfully",
            data: allColumns,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.createColumn = createColumn;
const getColumns = async (req, res, next) => {
    if (req.user?.role === "admin") {
        const allColumns = await columnModel_1.default.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
            success: true,
            message: "Columns fetched successfully",
            data: allColumns,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getColumns = getColumns;
const getColumn = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Column id is required"
        });
    }
    if (req.user?._id === id) {
        const column = await columnModel_1.default.findById(id).lean();
        if (!column) {
            res.status(404).json({
                success: false,
                message: 'Column not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Column fetched successfully",
            data: column,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getColumn = getColumn;
const deleteColumn = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Column id is required"
        });
    }
    if (req.user?._id === id) {
        const column = await columnModel_1.default.findByIdAndDelete(id).lean();
        if (!column) {
            res.status(404).json({
                success: false,
                message: 'Column not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Column deleted successfully",
            data: column,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.deleteColumn = deleteColumn;
const updateColumn = async (req, res, next) => {
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
            const column = await columnModel_1.default.findByIdAndUpdate(req.user._id, { name, email, profilePicture, password }, { new: true });
            if (!column) {
                return res.status(404).json({
                    success: false,
                    message: "No column found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Column updated successfully",
                data: column,
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
exports.updateColumn = updateColumn;
//# sourceMappingURL=columnController.js.map