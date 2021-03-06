/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

let getUserResults = results => {
  let returnResults = {};
 for (let i = 0; i < results.length; i++) {
  returnResults[results[i].title] = results[i];
 }
  return returnResults;
}



module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params);
    db.query(`SELECT name, quizzes.title, score  FROM quizzes_solved JOIN users ON users.id = user_id JOIN quizzes ON quiz_id = quizzes.id WHERE quizzes_solved.user_id = $1;`, [req.params.id])
      .then(data => {
        const results = data.rows;
        console.log(results);
        let templateVars = {results: getUserResults(results) }
        // console.log(templateVars);
        res.render("quiz_score", templateVars);
      })
      .catch(err => {
        console.log('catch');
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

