const UserModel = require("../models/user.model");
const fs = require("fs");
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (request, response, next) => {
  const tempPath = request.file.path;
  const fileName = request.body.name + "-pp" + ".jpg";
  const targetPath = `${__dirname}/../client/public/uploads/profil/${fileName}`;

  fs.rename(tempPath, targetPath, (error) => {
    if (error) return handleError(error, response);
  });

  try {
    await UserModel.findOne({ _id: request.body.userId })
      .then((docs) =>
        UserModel.findOneAndUpdate(
          { _id: request.body.userId },
          { $set: { picture: "./uploads/profil/" + docs.pseudo + "-pp.jpg" } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
          .select("-password")
          .then((docs) => response.status(200).send(docs))
          .catch((error) => response.status(500).send({ message: error }))
      )
      .catch((error) => response.status(500).send({ message: error }));
  } catch (error) {
    return response.status(500).send({ message: error });
  }
};
