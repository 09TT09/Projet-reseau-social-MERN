const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

// multer
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, `${__dirname}/../client/public/uploads/profil/`);
  },
  filename: function (request, file, cb) {
    cb(null, file.name + "-" + Date.now());
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000,
  },
  fileFilter: function (request, file, cb) {
    if ( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){ 
      cb(null, true); }
      else { cb(null, false); return cb(new Error("Seulement les fichiers au format .png, .jpg, .jpeg sont acceptés !"));
    }
  },
});

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;