const model = require("../models/presentationModel");

exports.getAllPresentations = (req, res) => {
  res.json(model.getPresentations());
};

exports.createPresentation = (req, res) => {
  const { title, presenter, criteria } = req.body;
  const id = Date.now().toString(); 
  const newPresentation = { id, title, presenter, criteria };
  model.addPresentation(newPresentation);
  res.status(201).json(newPresentation);
};

exports.updatePresentation = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  model.updatePresentation(id, updatedData);
  res.json({ message: "Apresentação atualizada com sucesso" });
};

exports.deletePresentation = (req, res) => {
  const { id } = req.params;
  model.deletePresentation(id);
  res.json({ message: "Apresentação deletada com sucesso" });
};