import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ id: items.length + 1,title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
    console.log(req.body);
    const id= req.body.updatedItemId;
    const new_title = req.body.updatedItemTitle;

    for(let i=0;i<items.length;i++){
      if(items[i].id == id){
        items[i].title = new_title;
      }
    }
    console.log(items);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  const id = req.body.deleteItemId;
  items = items.filter((item)=>{return item.id != id });
  console.log(items);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
