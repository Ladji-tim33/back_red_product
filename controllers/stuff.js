const Thing = require("../model/Thing");

exports.createThing = (req, res, next) => {
  const objetThing = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    telephone: req.body.telephone,
    price: req.body.price,
    devise: req.body.devise,
    image: req.body.image,
  };

  delete objetThing._id;
  delete objetThing._userId;

  const thing = new Thing({
    ...objetThing,
    // userId: req.auth.userId,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Hotel saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyThing = (req, res, next) => {
  const objectHotels = req.file
    ? {
        ...JSON.parse(req.body.Thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete objectHotels._userId;
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Thing.updateOne(
          { _id: req.params.id },
          { ...objetThing, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        thing.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Objet supprimé !' });
          })
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllThing = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
