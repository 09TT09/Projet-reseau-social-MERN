const mongoose = require("mongoose");

main()
  .then(() => console.log("base de données connectée"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_PASSWORD}@firsttestclustertr.sxjrx.mongodb.net/reseau-social`
  );
}
