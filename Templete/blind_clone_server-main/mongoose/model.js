const mongoose = require("mongoose");
const schema = require("./schema");

const db = mongoose.connection;
const model = (() => {
  db.on("error", console.error);
  db.on("open", () => {
    console.log("Connecting mongodb!");
  });

  // 몽고디비 앱 엑세스 주소
  mongoose.connect(
    `mongodb+srv://l1nked23:lee990801@cluster0.prmcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
  );

  // 스키마 연결
  const model = {};
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key]);
  }
  return model;
})();

module.exports = model;
