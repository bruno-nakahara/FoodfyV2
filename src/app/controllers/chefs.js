const Chef = require("../models/chef")

module.exports = {
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Please, fill all the fields")
            }
        }
        
        Chef.create(req.body, function() {
            return res.redirect(`/admin/chefs/create`)
        })
    },
    create(req, res) {
        return res.render('admin/chefs/create')
    },
    show(req, res) {

        Chef.all(function(chefs) {
            if (!chefs) return res.send('Chefs not found!')

            return res.render('admin/chefs/show', { chefs })
        })
        
    },
    detail(req, res) {

        Chef.find(req.params.id, function(data) {  
            Chef.recipe(req.params.id, function(items) {
               
                return res.render('admin/chefs/chef', { items, chef: data}) 
            })
            
        })
    },
    edit(req, res) {

        Chef.find(req.params.id, function(chef) {
            if (!chef) return res.send('Chefs not found!')

            return res.render('admin/chefs/edit', { chef })
        })
    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Please, fill all the fields")
            }
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {

        Chef.countRecipes(req.body.id, function(count) {
            
            if (count.total != '0') {

                return res.send("Não é possível deletar")
            } else {
                
                Chef.delete(req.body.id, function() {
                    return res.redirect('/admin/chefs/show')
                })
            }
        })
        
    }
}