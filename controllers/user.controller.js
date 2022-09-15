const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// GET INFO ALL USERS
module.exports.getAllUsers = async (request, response) => {
  const users = await UserModel.find().select("-password");
  response.status(200).json(users);
};

// GET INFO ONE USER
module.exports.userInfo = (request, response) => {
  if (!ObjectId.isValid(request.params.id))
    return response.status(400).send("Id inconnu : " + request.params.id);

  UserModel.findById(request.params.id, (error, docs) => {
    if (!error) response.send(docs);
    else console.log("Id inconnu : " + error);
  }).select("-password");
};

// UPDATE USER
module.exports.userUpdate = async (request, response) => {
  if (!ObjectId.isValid(request.params.id))
    return response.status(400).send("Id inconnu : " + request.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          biography: request.body.biography,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => response.send(docs))
      .catch((error) => response.status(500).send({ message: error }));
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

// DELETE USER
module.exports.userDelete = async (request, response) => {
  if (!ObjectId.isValid(request.params.id))
    return response.status(400).send("Id inconnu : " + request.params.id);

  try {
    await UserModel.deleteOne({ _id: request.params.id }).exec();
    response
      .status(200)
      .json({ message: "Suppression de l'utilisateur réussi" });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

// FOLLOW AN USER
module.exports.follow = async (request, response) => {
  if (
    !ObjectId.isValid(request.params.id) ||
    !ObjectId.isValid(request.body.idToFollow)
  )
    return response.status(400).send("Id inconnu : " + request.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      request.params.id,
      { $addToSet: { following: request.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => response.status(201).json(docs))
      .catch((error) => response.status(400).json(error));

    await UserModel.findByIdAndUpdate(
      request.body.idToFollow,
      { $addToSet: { followers: request.params.id } },
      { new: true, upsert: true }
    ).catch((error) => response.status(400).json(error));
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

// UNFOLLOW AN USER
module.exports.unfollow = async (request, response) => {
  if (
    !ObjectId.isValid(request.params.id) ||
    !ObjectId.isValid(request.body.idToUnfollow)
  )
    return response.status(400).send("Id inconnu : " + request.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      request.params.id,
      { $pull: { following: request.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => response.status(201).json(docs))
      .catch((error) => response.status(400).json(error));

    await UserModel.findByIdAndUpdate(
      request.body.idToUnfollow,
      { $pull: { followers: request.params.id } },
      { new: true, upsert: true }
    ).catch((error) => response.status(400).json(error));
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};
