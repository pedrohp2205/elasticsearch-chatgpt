require("express-async-errors")

const AppError = require("./utils/AppError.js")
const express = require("express");

const cors = require("cors")
const elastic = require("./service/elasticsearch.js")
const routes = require("./routes/index.js");



const app = express();
app.use(cors())
app.use(express.json());

app.use(routes);

elastic.createIndex().then()

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
});

const PORT = 7777;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));