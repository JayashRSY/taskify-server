import { Request, Response, NextFunction } from 'express';
import TicketModel from "../models/ticket.model.ts";

export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allTickets = await TicketModel.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Tickets fetched successfully",
                data: allTickets,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allTickets = await TicketModel.find({}, 'name email profilePicture role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Tickets fetched successfully",
                data: allTickets,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Ticket id is required"
        })
    }
    if (req.user?._id === id) {
        const ticket = await TicketModel.findById(id).lean();
        if (!ticket) {
            res.status(404).json({
                success: false,
                message: 'Ticket not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Ticket fetched successfully",
                data: ticket,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }

}

export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Ticket id is required"
        })
    }
    if (req.user?._id === id) {
        const ticket = await TicketModel.findByIdAndDelete(id).lean();
        if (!ticket) {
            res.status(404).json({
                success: false,
                message: 'Ticket not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "Ticket deleted successfully",
                data: ticket,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
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
            const ticket = await TicketModel.findByIdAndUpdate(
                req.user._id,
                { name, email, profilePicture, password },
                { new: true }
            );

            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: "No ticket found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Ticket updated successfully",
                data: ticket,
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
