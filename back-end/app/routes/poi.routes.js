module.exports = app => {
  const poi = require("../controllers/poi.controller.js");

  var router = require("express").Router();

  // Create a new POI
  router.post("/", poi.create);

  // Retrieve all POIs
  router.get("/", poi.findAllPublished);

  // Retrieve all published POIs
  router.get("/published", poi.findAllDraft);

  // Retrieve a single POI with id
  router.get("/:id", poi.findOne);

  // Update a POI with id
  router.put("/:id", poi.update);

  // Delete a POI with id
  router.patch("/:id", poi.switchStatusState);


  app.use('/api/poi', router);
};
