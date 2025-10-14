import Contact from "../db/contactModel.js";
import mongoose from "mongoose";

export const getContactsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const skip = (page - 1) * perPage;

    const totalItems = await Contact.countDocuments();
    const contacts = await Contact.find().skip(skip).limit(perPage);
    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
      pageInfo: {
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContactController = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContactController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Successfully updated contact!",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
