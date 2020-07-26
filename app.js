const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/candidateDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    posFilled: String,
    highestQ: String,
    resume: String
});
const Candidate = mongoose.model("Candidate", candidateSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const candidateName = req.body.candidateName;
    const candidateEmail = req.body.candidateEmail;
    const candidatePos = req.body.candidatePos;
    const candidateQ = req.body.candidateQ;
    const resumeLink = req.body.resumeLink;

    const candidate = new Candidate({
        name: candidateName,
        email: candidateEmail,
        posFilled: candidatePos,
        highestQ: candidateQ,
        resume: resumeLink
    });

    candidate.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
