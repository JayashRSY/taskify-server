"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.deleteTicket = exports.getTicket = exports.getTickets = exports.createTicket = void 0;
const ticketModel_1 = __importDefault(require("../models/ticketModel"));
const createTicket = async (req, res, next) => {
    const { title, description, dueDate, labels, assignee, status, priority } = req.body;
    if (!title || !status || !priority) {
        return res.status(400).json({ message: 'title, status and priority are required fields' });
    }
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    const newTicket = await ticketModel_1.default.create({
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
exports.createTicket = createTicket;
const getTickets = async (req, res, next) => {
    if (!req.user?.email) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    const allTickets = await ticketModel_1.default.find({ createdBy: req.user.email }).lean();
    res.status(200)
        .json({
        success: true,
        message: "Tickets fetched successfully",
        data: allTickets,
    });
};
exports.getTickets = getTickets;
const getTicket = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Ticket id is required"
        });
    }
    if (req.user?._id === id) {
        const ticket = await ticketModel_1.default.findById(id).lean();
        if (!ticket) {
            res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Ticket fetched successfully",
            data: ticket,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.getTicket = getTicket;
const deleteTicket = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Ticket id is required"
        });
    }
    if (req.user?._id === id) {
        const ticket = await ticketModel_1.default.findByIdAndDelete(id).lean();
        if (!ticket) {
            res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "Ticket deleted successfully",
            data: ticket,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Unauthorized"
        });
    }
};
exports.deleteTicket = deleteTicket;
const updateTicket = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, dueDate, labels, assignee, status, priority } = req.body;
    if (!req.user?.email) {
        return res.status(400).json({ success: false, message: 'Unauthorized' });
    }
    if (!id) {
        return res.status(400).json({ success: false, message: 'Ticket id is required' });
    }
    const updatedTicket = await ticketModel_1.default.findByIdAndUpdate(id, {
        title,
        description,
        dueDate,
        labels,
        assignee,
        status,
        priority,
        createdBy: req.user.email,
        updatedBy: req.user.email,
    }, { new: true });
    if (updatedTicket) {
        return res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: updatedTicket,
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: "Ticket not found",
        });
    }
};
exports.updateTicket = updateTicket;
//# sourceMappingURL=ticketController.js.map