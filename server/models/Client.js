const mongoose = require("mongoose");

// const MemoSchema = new mongoose.Schema(
//   {
//     context: String,
//     require: false,
//   },
//   { timestamps: true }
// );

const ClientSchema = new mongoose.Schema(
  {
    clientNumber: {
      type: String,
      required: false,
    },
    clientFromProject: {
      type: String,
      required: false,
    },
    clientExtra: {
      type: Object,
      required: false,
      default: {
        gender: "M",
        age: 30,
        level: 0,
        name: "",
        telNum2: "",
        info1: "",
        info2: "",
      },
    },
    clientStatus: {
      type: Object,
      required: false,
      default: {
        active: true,
        like: false,
        dislike: false,
        favorite: false,
      },
    },
    clientMemo: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
