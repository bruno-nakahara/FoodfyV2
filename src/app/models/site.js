const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(`
        SELECT  chefs.*, ( SELECT count(*)  From recipes WHERE chefs.id = recipes.chef_id) AS total
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        `, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows)

        })
    }, 
    findBy(filter, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title ILIKE '%${filter}%'
        `, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })
    }
}