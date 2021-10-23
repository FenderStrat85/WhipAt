// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//   function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//   return new (P || (P = Promise))(function (resolve, reject) {
//     function fulfilled (value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//     function rejected (value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//     function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//     step((generator = generator.apply(thisArg, _arguments || [])).next());
//   });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//   var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//   return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
//   function verb (n) { return function (v) { return step([n, v]); }; }
//   function step (op) {
//     if (f) throw new TypeError("Generator is already executing.");
//     while (_) try {
//       if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//       if (y = 0, t) op = [op[0] & 2, t.value];
//       switch (op[0]) {
//         case 0: case 1: t = op; break;
//         case 4: _.label++; return { value: op[1], done: false };
//         case 5: _.label++; y = op[1]; op = [0]; continue;
//         case 7: op = _.ops.pop(); _.trys.pop(); continue;
//         default:
//           if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//           if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//           if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//           if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//           if (t[2]) _.ops.pop();
//           _.trys.pop(); continue;
//       }
//       op = body.call(thisArg, _);
//     } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//     if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//   }
// };
// var express = require('express');
// var cors = require('cors');
// var session = require('express-session');
// var router = require('../router');
// var db = require('../models/db');
// require('dotenv').config();
// var SERVER_PORT = process.env.SERVER_PORT || 3001;
// var SECRET = process.env.SECRET || 'catnip crazy';
// var corsConfig = {
//   // specify front-end server is the only allowed to make requests
//   origin: 'http://localhost:3000',
//   // allows to process cookies
//   credentials: true,
// };
// var app = express();
// app.use(cors(corsConfig));
// app.use(express.json());
// app.use(session({
//   name: 'sid',
//   saveUninitialized: false,
//   resave: false,
//   secret: SECRET,
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     sameSite: true,
//     httpOnly: false,
//     secure: false, // make this true in production
//   },
// }));
// app.use(router);
// // return 404 for unspecified routes
// app.get('*', function (req, res) {
//   res.status(404);
// });
// try {
//   (function () {
//     return __awaiter(void 0, void 0, void 0, function () {
//       return __generator(this, function (_a) {
//         switch (_a.label) {
//           case 0:
//             app.listen(SERVER_PORT);
//             console.log("Server up \uD83D\uDE80 on port " + SERVER_PORT + "!");
//             return [4 /*yield*/, db.sequelize.sync()];
//           case 1:
//             _a.sent();
//             // await db.sequelize.sync({ force: true }); //reset db
//             console.log('Database connection has been established successfully.');
//             return [2 /*return*/];
//         }
//       });
//     });
//   })();
// }
// catch (err) {
//   console.log("Server start failed " + err);
// }
// module.exports = app;
