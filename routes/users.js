// const sharp = require('sharp');
// const path = require('path');
// const _ = require('lodash');
const usersRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');

const requireCurrentUser = require('../middlewares/requireCurrentUser');
// const handleImageUpload = require('../middlewares/handleImageUpload');
const User = require('../models/user');
// const Event = require('../models/event');
// const { ValidationError, RecordNotFoundError } = require('../error-types');
// const tryDeleteFile = require('../helpers/tryDeleteFile');

usersRouter.get(
  '/',
  requireCurrentUser,
  expressAsyncHandler(async (req, res) => {
    res.send((await User.findMany()).map(User.getSafeAttributes));
  })
);

usersRouter.patch(
  '/buygems',
  requireCurrentUser,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.currentUser;
    const { gems } = req.body;
    res.send(await User.buyGems({ id, gems }));
  })
);

usersRouter.get(
  '/show-registrations',
  requireCurrentUser,
  expressAsyncHandler(async (req, res) => {
    const attendeeId = req.currentUser.id;
    try {
      res.send(await User.findRegistrations(attendeeId));
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  })
);

// usersRouter.get(
//   '/:id/events',
//   requireCurrentUser,
//   expressAsyncHandler(async (req, res) => {
//     try {
//       const events = await Event.findByUser(parseInt(req.params.id, 10));

//       res.send(events);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error);
//     }
//   })
// );

// usersRouter.post(
//   '/',
//   expressAsyncHandler(async (req, res) => {
//     const validationErrors = User.validate(req.body);
//     if (validationErrors)
//       return res.status(422).send({ errors: validationErrors.details });
//     const newUser = await User.create(req.body);
//     return res.status(201).send(User.getSafeAttributes(newUser));
//   })
// );

// usersRouter.post(
//   '/reset-password',
//   expressAsyncHandler(async (req, res) => {
//     const { userId, token, password } = req.body;
//     const user = await User.findOne(userId);

//     if (user && (await User.verifyPassword(token, user.resetPasswordToken))) {
//       const newHashedPassword = await User.hashPassword(password);
//       await User.update(user.id, {
//         hashedPassword: newHashedPassword,
//         resetPasswordToken: null,
//       });
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(400);
//     }
//   })
// );

// usersRouter.patch(
//   '/:id',
//   requireCurrentUser,
//   expressAsyncHandler(async (req, res, next) => {
//     if (
//       req.currentUser.role === 'admin' ||
//       req.currentUser.id.toString() === req.params.id
//     )
//       next();
//     else res.sendStatus(403);
//   }),
//   handleImageUpload.single('avatar'),
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne(req.params.id);
//     const oldAvatarUrl = user.avatarUrl;
//     if (!user) throw new RecordNotFoundError('users', req.params.id);
//     const data = _.omit(req.body, 'avatar');

//     if (req.file && req.file.path) {
//       const ext = path.extname(req.file.path);
//       const outputFilePath = `${req.file.path.replace(ext, '')}_thumb.webp`;

//       await sharp(req.file.path)
//         .resize(250, 250, 'contain')
//         .webp({ quality: 85 })
//         .toFile(outputFilePath);

//       await tryDeleteFile(req.file.path);

//       if (req.body.avatarUrl === '') {
//         await tryDeleteFile(outputFilePath);
//       } else {
//         console.log(outputFilePath);
//         data.avatarUrl = outputFilePath;
//       }
//     }

//     const error = User.validate(data, true);
//     if (error) throw new ValidationError(error.details);

//     const updated = await User.update(req.params.id, data);
//     if (req.file && req.file.path) {
//       await tryDeleteFile(oldAvatarUrl);
//     }

//     res.send(User.getSafeAttributes(updated));
//   })
// );

module.exports = usersRouter;
