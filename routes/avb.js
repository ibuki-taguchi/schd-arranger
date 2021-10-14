"use strict";
const express = require("express");
const router = express.Router();
const authenticationEnsurer = require("./auth-Ensurer");
const Availability = require("../models/avb");

router.post(
  "/:scheduleId/users/:userId/candidates/:candidateId",
  authenticationEnsurer.ensure,
  (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    const userId = req.params.userId;
    const candidateId = req.params.candidateId;
    let availability = req.body.availability;
    availability = availability ? parseInt(availability) : 0;

    Availability.upsert({
      scheduleId: scheduleId,
      userId: userId,
      candidateId: candidateId,
      availability: availability,
    }).then(() => {
      res.json({ status: "OK", availability: availability });
    });
  }
);

module.exports = router;
