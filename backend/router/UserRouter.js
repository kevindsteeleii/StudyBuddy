 const express = require('express'),
           app = express(),
        router = express.Router(),
userController = require('../controllers/UserController'),
           jwt = require('jsonwebtoken'),
   verifyToken = require('../middleware/middleware').verifyToken


  router
    .route('/cardPools')
    .all((req, res, next) => {
      next()
    })
    .get((req, res) => {
      userController.getAllCardPools()
      .then(pools => res.json(pools))
    })

  router
    .route('/')
    .all((req, res, next) => {
      next()
    })
    .get((req, res, next) => {
      userController.index()
      .then(users => res.json(users))
    })
    .post((req, res, next) => {
      userController.createUser(req.body.user)
      .then(user =>  {
        jwt.sign({ user }, 'secret', /*{ expiresIn: '5m'},*/ (err, token)=> {

          userController.createDeck({name: 'CardPool', description: "Complete Collection of all Cards"}, user.id)
          return res.json({user, token})
        })

      })
    })

  router
    .route('/:id/browse-decks')
    .all((req, res, next) => {
      next()
    })
    .get((req, res) => {
      console.log(req.params)
      userController.browseOthersDecks(req.params.id)
      .then(otherDecks => res.json(otherDecks))
    })

  router.get('/:id/cardPool',(req, res) =>{
      userController.getCardPool(req.params.id)
      .then(cardPool => res.json(cardPool))
    })

  router
    .route('/:id/decks')
    .all((req, res, next) => {
      next()
    })
    .get((req, res, next) => {
      userController.getDecks(req.params.id)
      .then(decks => res.json(decks))
    })
    .post((req, res) => {
      userController.createDeck(req.body.deck, req.params.id)
      .then(deck => res.json(deck))
    })

  router
    .route('/:id')
    .all((req, res, next) => {
      next()
    })
    .get((req, res, next) => {
      userController.show(req.params.id)
      .then(user => res.json(user))
    })
    .patch((req, res) => {
      userController.editUser(req.body.user, req.params.id)
      .then(user => res.json(user))
    })
    .delete((req, res) => {
      userController.removeUser(req.params.id)
      .then(noUser => res.json(noUser))
    })

  module.exports = router
/*
  *NOTE:
  Hooks work but does not do anything w/ the undefined Deck model!!
*/
