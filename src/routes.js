const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const sites = require('./app/controllers/sites')

//Main

routes.get("/", sites.main)

routes.get("/main/index", sites.main)

routes.get("/main/about", function(req, res) {
    return res.render("main/about")
})

routes.get("/main/recipes", sites.all)

routes.get("/main/recipes/:id", sites.detail)

routes.get("/main/chefs", sites.allChefs)

routes.get("/main/search", sites.search)

//Admin

//Recipes
routes.get("/admin/recipes", recipes.index)

routes.get("/admin/recipes/index", recipes.index)

routes.get("/admin/recipes/create", recipes.cheflist)

routes.post("/admin/recipes", recipes.post)

routes.get("/admin/recipes/:id", recipes.show)

routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.put("/admin/recipes", recipes.put)

routes.delete("/admin/recipes", recipes.delete)

//Chefs
routes.get("/admin/chefs/create", chefs.create)

routes.post("/admin/chefs", chefs.post)

routes.get("/admin/chefs/show", chefs.show)

routes.get("/admin/chefs/:id", chefs.detail)

routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.put("/admin/chefs", chefs.update)

routes.delete("/admin/chefs", chefs.delete)

//Error
routes.use(function(req, res) {
    res.status(404).render('main/not-found')
})

module.exports = routes