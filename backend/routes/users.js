var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/user');

// Get details of one user based on FirstName
router.get("/getUser/:id", async (request, response) => {
  var tempid = request.params.id

  if(tempid.length != 24){
    response.status(400).send("Please send a valid id of 24 characters")
  }else{

    try{
      const output = await User.find({_id: request.params.id});
      try {
        response.status(200).send(output);
      } catch (error) {
        response.status(500).send(error);
      }
    }catch(error){
      response.status(500).send(error);
    }
  }
  
  
});

// GET listing for all users.
router.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
});

// Create a new user
router.post('/createNewUser', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Password: req.body.Password,
    EmailId: req.body.EmailId,
    Location: req.body.Location,
    OnboardingReason: req.body.OnboardingReason,
    Keywords: req.body.Keywords,
    Skills: req.body.Skills,
    MusicalExpertise: req.body.MusicalExpertise,
    NotificationPreference: req.body.notificationPreference,
    ProfileCreationDate: req.body.ProfileCreationDate,
    PhotoURL: req.body.PhotoURL,
    Description: req.body.Description,
    Heading: req.body.Heading,
    BookmarkedProfiles: req.body.BookmarkedProfiles,

  });

  user.save().then;

  res.status(200).json({
    message: 'Handling GET request on /',
    createdUser: user
  })

});

// Updating a user with a given id
router.patch("/updateUser/:id", async (request, response) => {
  try {
    await User.findByIdAndUpdate(request.params.id, request.body);
    // await User.save();
    response.send("updated user"+ request.params.id);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

module.exports = router;
