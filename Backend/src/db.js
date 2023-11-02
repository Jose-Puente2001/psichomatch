require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const user = require("./models/User");
const patient = require("./models/Patient")
const contact = require("./models/Contact")
const therapist = require("./models/Therapist")
const category = require("./models/Category")
const rating = require("./models/Rating")
const hour = require("./models/Hour")
const availability = require("./models/Availability")
const reservation = require("./models/Reservation")
const country = require("./models/Country")
const plan = require("./models/Plan")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME  } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}:${DB_PORT ?? ""}/${DB_NAME ?? ""}`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Solo si estás utilizando un certificado autofirmado y no uno emitido por una autoridad de certificación reconocida.
      }
    },
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

user(sequelize);
contact(sequelize);
patient(sequelize);
therapist(sequelize);
category(sequelize);
rating(sequelize);
hour(sequelize);
availability(sequelize);
reservation(sequelize);
country(sequelize);
plan(sequelize)

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
const {
  User,
  Contact,
  Patient,
  Therapist,
  Category,
  Rating,
  Hour,
  Availability,
  Reservation,
  Country,
  Plan
} = sequelize.models;


Therapist.belongsTo(Category)
Category.hasOne(Therapist)

Therapist.belongsTo(Plan)
Plan.hasOne(Therapist)

Therapist.belongsTo(Country)
Country.hasOne(Therapist)

Therapist.hasMany(Rating);
Rating.belongsTo(Therapist);

Patient.hasOne(Rating);
Rating.belongsTo(Patient);

Therapist.hasMany(Availability)
Availability.belongsTo(Therapist)

Hour.hasMany(Availability)
Availability.belongsTo(Hour)

Availability.hasOne(Reservation)
Reservation.belongsTo(Availability)

Patient.hasOne(Reservation)
Reservation.belongsTo(Patient)


Therapist.hasOne(Reservation)
Reservation.belongsTo(Therapist)



/*
User.hasOne(Rating);
Rating.belongsTo(User);

Language.hasOne(Movie);
Movie.belongsTo(Language);

Address.hasOne(Purchase);
Purchase.belongsTo(Address);

User.hasMany(Purchase);
Purchase.belongsTo(User);

User.hasMany(Address);
Address.belongsTo(User);

WishList.belongsTo(User);
WishList.belongsTo(Movie);

Purchase.belongsToMany(Movie, {
  through: PurchaseMovie,
  foreignKey: "PurchaseId",
  otherKey: "MovieId",
});

Movie.belongsToMany(Purchase, {
  through: PurchaseMovie,
  foreignKey: "MovieId",
  otherKey: "PurchaseId",
});
*/
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};