import Contact from "../db/contactModel.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { sortBy = "name", sortOrder = "asc", type, isFavourite } = req.query;

    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const query = Contact.find();

    if (isFavourite !== undefined) {
      query.where("isFavourite").equals(isFavourite === "true");
    }

    if (type) {
      query.where("contactType").equals(type);
    }

    query.sort({ [sortBy]: sortDirection });

    const contacts = await query.exec();

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ status: 200, message: "Successfully found contact!", data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ message: "Contact created", data: newContact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated", data: updated });
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { isFavourite: req.body.isFavourite },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact status updated", data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.contactId);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
