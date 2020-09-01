const Recipe = require('../models/recipe')


module.exports = {
      
    post(req, res) {
    
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all the fields')
            }
        }
        
        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes`)
        })
    },
    
    index(req, res) {

        Recipe.all(function(items) {
            return res.render("admin/recipes/index", {items})
        })

    },
    
    show(req, res) {
        
        Recipe.detail(req.params.id, function(item) {

            const recipe = {
                ...item,
                information: item.information.replace(/\\n/g, "<br />")
            }
            return res.render("admin/recipes/show", {item: recipe})
        })
        
    },
    
    edit(req, res) {
        
        Recipe.find(req.params.id, function(recipe) {
            Recipe.chefOptions(function(options) {
                return res.render("admin/recipes/edit", {item: recipe, chefsOptions: options})
            })
            
        })
    
    },
    
    put(req, res) {

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "") {
                console.log(req.body)
                return res.send('Please, fill all the fields')
            }
        }
        
        Recipe.update(req.body, function(recipe) {

            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    
    },
    
    delete(req, res) {
    
        Recipe.delete(req.body.id, function() {
            return res.redirect("/admin/recipes")
        })
             
    },

    cheflist(req, res) {

        Recipe.chefOptions(function(options) {
            return res.render("admin/recipes/create", {chefsOptions: options})
        })
        
    }
}

