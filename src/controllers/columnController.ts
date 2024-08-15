import { Request, Response, NextFunction } from 'express';
import ColumnModel from "../models/columnModel.js";

export const createColumn = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allColumns = await ColumnModel.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Columns fetched successfully",
                data: allColumns,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const getColumns = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allColumns = await ColumnModel.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Columns fetched successfully",
                data: allColumns,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const getColumn = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Column id is required"
        })
    }
    if (req.user?._id === id) {
        const column = await ColumnModel.findById(id).lean();
        if (!column) {
            res.status(404).json({
                success: false,
                message: 'Column not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Column fetched successfully",
                data: column,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }

}

export const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Column id is required"
        })
    }
    if (req.user?._id === id) {
        const column = await ColumnModel.findByIdAndDelete(id).lean();
        if (!column) {
            res.status(404).json({
                success: false,
                message: 'Column not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Column deleted successfully",
                data: column,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
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
            const column = await ColumnModel.findByIdAndUpdate(
                req.user._id,
                { name, email, profilePicture, password },
                { new: true }
            );

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
