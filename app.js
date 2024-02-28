const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error.js");
const path = require("path");
var expressHbs = require("express-handlebars");
const index = require("./routes/indexRoutes.js");
const user = require("./routes/userRoutes.js");
const product = require("./routes/productRoute.js");
const order = require("./routes/orderRoutes.js");
const checkout = require("./routes/checkoutRoutes.js");
const Handlebars = require("handlebars");
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("view engine", ".hbs");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
app.use(express.static(path.join(__dirname, "/public")));
app.engine(
    ".hbs",
    expressHbs.engine({
        extname: ".hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        helpers: {
            json: function (context) {
                return JSON.stringify(context);
            },
            xIf: function (v1, operator, v2, options) {
                switch (operator) {
                    case "==":
                        return v1 == v2 ? options.fn(this) : options.inverse(this);
                    case "===":
                        return v1 === v2 ? options.fn(this) : options.inverse(this);
                    case "!==":
                        return v1 !== v2 ? options.fn(this) : options.inverse(this);
                    case "!=":
                        return v1 != v2 ? options.fn(this) : options.inverse(this);
                    case "<":
                        return v1 < v2 ? options.fn(this) : options.inverse(this);
                    case "<=":
                        return v1 <= v2 ? options.fn(this) : options.inverse(this);
                    case ">":
                        return v1 > v2 ? options.fn(this) : options.inverse(this);
                    case ">=":
                        return v1 >= v2 ? options.fn(this) : options.inverse(this);
                    case "&&":
                        return v1 && v2 ? options.fn(this) : options.inverse(this);
                    case "||":
                        return v1 || v2 ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            },
        },
    })
);

// Handlebars.registerHelper('json', function(context) {
//     return JSON.stringify(context);
//   });
app.use(
    session({
        key: "user_sid",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/", index);
app.use("/", product);
app.use("/", user);
app.use("/", order);
app.use("/", checkout);

//middleware for error

app.use(errorMiddleware);

module.exports = app;
