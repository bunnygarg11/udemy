const fs = require("fs");

let book = {
  // title:"hdghdgdh"
  title: "Ego is the Enemy",
  author: "bunny"
};

book = JSON.stringify(book);

// fs.writeFileSync("fstest.json",book)
// fs.unlink("fstest.json", err => {
    //   console.log(err);
    // })
    let data=fs.readFileSync("fstest.json").toString()
    data=JSON.parse(data)
    console.log(data);