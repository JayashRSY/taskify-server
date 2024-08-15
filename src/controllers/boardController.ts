import { Request, Response, NextFunction } from 'express';
import BoardModel from "../models/boardModel";

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🚀 ~ file: Board.controller.ts:6 ~ req.body:", req.body);
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Board name is required' });
    }
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const newBoard = await BoardModel.create({
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
export const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allBoards = await BoardModel.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Boards fetched successfully",
                data: allBoards,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const getBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Board id is required"
        })
    }
    if (req.user?._id === id) {
        const board = await BoardModel.findById(id).lean();
        if (!board) {
            res.status(404).json({
                success: false,
                message: 'Board not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Board fetched successfully",
                data: board,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }

}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Board id is required"
        })
    }
    if (req.user?._id === id) {
        const board = await BoardModel.findByIdAndDelete(id).lean();
        if (!board) {
            res.status(404).json({
                success: false,
                message: 'Board not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Board deleted successfully",
                data: board,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
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
            const board = await BoardModel.findByIdAndUpdate(
                req.user._id,
                { name, email, profilePicture, password },
                { new: true }
            );

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
        } catch (error) {
            next(error); // Forward the error to the error handling middleware
        }
    } else {
        return res.status(402).json({
            success: false,
            message: "Unauthorized",
        });
    }
};
