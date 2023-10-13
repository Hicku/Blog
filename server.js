const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session")
const path = require("path")
SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;


const helpers = require("./utils/helpers");

app.use(express.json());
express.urlencoded({extended : true});
app.use(express.static(path.join(__dirname, "public")));

const hbs = exphbs.create({ helpers })

const sess = {
    secret: "super secret secret",
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"))
})

