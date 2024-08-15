"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = exports.deleteBoard = exports.getBoard = exports.getBoards = exports.createBoard = void 0;
const boardModel_1 = __importDefault(require("../models/boardModel"));
const createBoard = async (req, res, next) => {
    console.log("🚀 ~ file: Board.controller.ts:6 ~ req.body:", req.body);
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Board name is required' });
    }
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    const newBoard = await boardModel_1.default.create({
        name,
        description,
        createdBy: req.user.email,
    });
    res.status(201).json({
        success: true,
        message: "Board created successfully",
        data: newBoard,
    });
};
exports.createBoard = createBoard;
const getBoards = async (req, res, next) => {
    if (req.user?.role === "admin") {
        const allBoards = await boardModel_1.default.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
            success: true,
            message: "Boards fetched successfully",
            data: allBoards,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getBoards = getBoards;
const getBoard = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Board id is required"
        });
    }
    if (req.user?._id === id) {
        const board = await boardModel_1.default.findById(id).lean();
        if (!board) {
            res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Board fetched successfully",
            data: board,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getBoard = getBoard;
const deleteBoard = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Board id is required"
        });
    }
    if (req.user?._id === id) {
        const board = await boardModel_1.default.findByIdAndDelete(id).lean();
        if (!board) {
            res.status(404).json({
                success: false,
                message: 'Board not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Board deleted successfully",
            data: board,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.deleteBoard = deleteBoard;
const updateBoard = async (req, res, next) => {
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
            const board = await boardModel_1.default.findByIdAndUpdate(req.user._id, { name, email, profilePicture, password }, { new: true });
            if (!board) {
                return res.status(404).json({
                    success: false,
                    message: "No board found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Board updated successfully",
                data: board,
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
exports.updateBoard = updateBoard;
//# sourceMappingURL=boardController.js.map