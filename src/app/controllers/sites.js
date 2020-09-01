const Recipe = require('../models/recipe')
const Chef = require("../models/chef")
const Site = require("../models/site")

module.exports = {
    main(req, res) {
        Recipe.all(function(recipes) {

            let recipeForIndex
            
            if (Object.keys(recipes).length >= 7) {
                recipeForIndex = recipes.slice(0, 6)
            }

            return res.render('main/index', {items: recipeForIndex})
        })
    },
    all(req, res) {
        Recipe.all(function(recipes) {
            return res.render('main/recipes', {items: recipes})
        })
    },
    detail(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            return res.render('main/recipe', {item: recipe})
        })
    },
    allChefs(req,res) {
        Site.all(function(chefs) {
            return res.render("main/chefs", {chefs})
        })
    },
    search(req, res) {

        const {filter} = req.query

        if (filter) {
            Site.findBy(filter, function(filteredList) {
                return res.render("main/search", {items: filteredList, filter})
            })
        } else {
            Recipe.all(function(recipes) {
                return res.render('main/recipes', {items: recipes})
            })
        }

       
        
    }
}