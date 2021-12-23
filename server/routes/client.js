const router = require("express").Router();
const Client = require("../models/Client");

//등록
router.post("/register/clients", async (req, res) => {
  // console.log(req.body);
  // res.status(200);

  const clientObject = req.body;
  //console.log(Object.values(clientObject));

  try {
    const savedClient = await Client.insertMany(clientObject);
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/find/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET One
router.get("/find/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).sort({ _id: -1 });
    console.log(client);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const client = await Client.find().sort({ _id: -1 });
    console.log(client);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
