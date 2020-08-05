const db = require("../models");
const Poi = db.poi;

exports.create = (req, res) => {
  // Validate request
  if ( !req.body.name ) {
    res.status(400).send({ message: "Certains éléments sont manquants." });
    return;
  }

  // Create a POI
  const poi = new Poi({
    name: req.body.name,
    address: {
      full_address: req.body.address.full_address,
      longitude: req.body.adress.longitude,
      latitude: req.body.adress.latitude
    },
    type: req.body.type,
    published: false,
    state: "pending",
    poster: req.body.op,
  });

  // Save POI in the database
  poi
    .save(poi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu pendant la création du POI."
      });
    });
};



exports.findAllPublished = (req, res) => {
  Poi.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la recherche des POI."
    });
  });
};



exports.findAllDraft = (req, res) => {
  Poi.find({ published: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la recherche des POI."
    });
  });
};



exports.findOne = (req, res) => {
  const id = req.params.id;

  Poi.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Poi introuvable avec l'id : " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Une erreur est survenu lors de la recherche du POI" +
                        " avec l'id : " + id });
    });
};



exports.update = (req, res) => {
  // Validate request
  if ( !req.body.name || !req.body.address || !req.body.address.full_address ||
      !req.body.address.longitude || !req.body.address.latitude ||
      !req.body.type ) {
    res.status(400).send({ message: "Certains éléments sont manquants." });
    return;
  }

  let poiToUpdate = req.body;
  poiToUpdate.published = false;
  poiToUpdate.state = "pending";

  const id = req.params.id;

  Poi.findByIdAndUpdate(id, poiToUpdate)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le POI avec l'id=${id}. Ce POI
           est peut-être introuvable.`
        });
      } else res.send({ message: "Le POI a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenu en mettant à jour le POI avec " +
        "l'id : " + id
      });
    });
};



exports.switchStatusState = (req, res) => {
  // Validate request
  if ( !req.body.published || !req.body.state ) {
    res.status(400).send({ message: "Certains éléments sont manquants." });
    return;
  }

  const id = req.params.id;

  Poi.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le POI avec l'id=${id}. Ce POI
           est peut-être introuvable.`
        });
      } else res.send({ message: "Le POI a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenu en mettant à jour le POI avec " +
        "l'id : " + id
      });
    });
};
