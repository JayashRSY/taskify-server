import { Request, Response, NextFunction } from 'express';
import TicketModel from "../models/ticket.model.ts";

export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, dueDate, labels, assignee, status, priority } = req.body;
    if (!title || !status || !priority) {
        return res.status(400).json({ message: 'title, status and priority are required fields' });
    }
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const newTicket = await TicketModel.create({
        title,
        description,
        dueDate,
        labels,
        assignee,
        status,
        priority,
        createdBy: req.user.email,
        updatedBy: req.user.email,
    });

    res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        data: newTicket,
    });
};
export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    const allTickets = await TicketModel.find({ createdBy: req.user.email }).lean();
    res.status(200)
        .json({
            success: true,
            message: "Tickets fetched successfully",
            data: allTickets,
        })
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
    const { id } = req.params;
    const { title, description, dueDate, labels, assignee, status, priority } = req.body;

    if (!req.user?.email) {
        return res.status(400).json({ success: false, message: 'Unauthorized' });
    }
    if (!id) {
        return res.status(400).json({ success: false, message: 'Ticket id is required' });
    }
    const updatedTicket = await TicketModel.findByIdAndUpdate(id, {
        title,
        description,
        dueDate,
        labels,
        assignee,
        status,
        priority,
        createdBy: req.user.email,
        updatedBy: req.user.email,
    });

    if (updatedTicket) {
        return res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: updatedTicket,
        });
    } else {
        return res.status(404).json({
            success: false,
            message: "Ticket not found",
        });
    }
};
