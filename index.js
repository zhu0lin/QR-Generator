import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const date = new Date();
const currYear = date.getFullYear();

app.get("/", (req, res) => {
    res.render("index.ejs", { generatedQR: "No URL yet", year: currYear });
});

app.post("/submit", (req, res) => {
    const userURL = req.body.url;
    try {
        const qrCodeURL = `https://qrtag.net/api/qr_transparent_4.png?url=${encodeURIComponent(userURL)}`;
        res.render("index.ejs", { generatedQR: qrCodeURL, year: currYear });
    }
    catch (error) {
        const errorMessage = error.response ? error.response.data : "An error occurred while generating the QR code.";
        res.render("index.ejs", { generatedQR: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});