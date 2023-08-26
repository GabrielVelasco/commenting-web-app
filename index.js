// ======= API -> CREATING END POINTS TO BE EXPOSED AND CONSUMED BY OTHER PROGRAMS ======= //

const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

// CRUD App ==> Create: get(com.../new) -> post(/comm...), 
// 				Read: get(/com...) or get(com.../:id),
// 				Update: get(com.../:id/edit) -> patch(com.../:id),
// 				Delete: delete(/com.../:id)

// ---------------------------------------------------------------------- //

const comments = {
	'a98b3adc-1104-42f5-b2b0-7648a20baf34': {
		username: 'User0',
		comment: 'User0 comment'
	},
	'a98b3adc-1104-42f5-b2b0-7648a20baf35': {
		username: 'User1',
		comment: "User1 comment"
	}
}

// const comments = [
// 	{
// 		id: 0,
// 		username: "User0",
// 		comment: "User0 comment"
// 	},
// 	{
// 		id: 1,
// 		username: "User1",
// 		comment: "User1 comment"
// 	},
// 	{
// 		id: 2,
// 		username: "User2",
// 		comment: "User2 comment"
// 	}
// ]
// ---------------------------------------------------------------------- //

// ...views/comments == tempalte for showing all comments(resourse)
app.set("view engine", "ejs"); // import ejs module
app.set("views", path.join(__dirname, "/views")); // set views path

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method'));
// ---------------------------------------------------------------------- //

// goal: GET url to show all comments
app.get("/comments", (req, res) => {
	res.render("comments/index.ejs", { comments });
	// console.log(comments);
});
// ---------------------------------------------------------------------- //

// goal: GET route to render the form
app.get("/comments/new", (req, res) => {
	res.render("comments/new.ejs"); // form sends its data to a POST route
});

app.post("/comments", (req, res) => {
	// data comes from a form (req.body) 
	// All data inside the FORM (inputs names...) will be stored at req.body
	// append new comment... "add to DB"
	// console.log(req.body);
	const { username, comment } = req.body;
	if(comment.length > 0 && comment.length <= 10){
		// post the comment
		const id = uuid();

		// push the comment
		comments[id] = {
			username: username, 
			comment: comment
		};

		res.redirect("/comments"); // GET req | use for POST/PATCH... req
	}else{
		res.redirect("/comments/new");
		
	}
});
// ---------------------------------------------------------------------- //

// goal: route patterns w/ PARAMS to request a comment by ID
app.get("/comments/:id", (req, res) => {
	const { id } = req.params; // will be a str
	// const idx = parseInt(id);
	const commentToReturn = comments[id]; // pre-load the comment
	if(commentToReturn != undefined){
		res.render("comments/show.ejs", {comment: commentToReturn, id});
	}else{
		res.send("Comment doesn't exists!");
	}

});

// ---------------------------------------------------------------------- //

// goal: UPDATE (patch) 
app.get("/comments/:id/edit", (req, res) => {
	// this REQ will come from the <a> edit at show.ejs

	const { id } = req.params; // get the ID from URL
	const comment = comments[id]; // pre-load the comment
	res.render("comments/edit.ejs", { comment, id });
});

app.patch("/comments/:id", (req, res) => {
	// data (new comment) should come from a form/JSON...
	// works like POST
	const { id } = req.params;
	const newComment = req.body.comment; // get new comment | for PATCH, payload only contains what must be PATCHED.
	// console.log(comments[id]);
	comments[id].comment = newComment; // update

	res.redirect("/comments"); // GET req | use for POST/PATCH/DELETE... req
});
	
// ---------------------------------------------------------------------- //

// goal: DELETE req route
app.delete("/comments/:id", (req, res) => {
	const { id } = req.params;
	delete comments[id]; // delete the specific comment
	res.redirect("/comments");
});

// ---------------------------------------------------------------------- //

// test examples
app.get("/get", (req, res) => {
	res.send("get Home page!")
});

app.post("/post", (req, res) => {
	console.log(req.body);
	res.send("post Home page!")
});

app.listen(3001, () => {
	console.log("Listening to 3000");
});