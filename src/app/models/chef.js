const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })
    },
    all(callback) {
        db.query(`SELECT * FROM chefs`, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })

    },
    update(data, callback) {
        const query = (`
            UPDATE chefs SET
            name=($1),
            avatar_url=($2)
        WHERE id = $3
        `)

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            return callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            return callback()
        })
    },
    find(id, callback) {

        db.query(`
            SELECT  chefs.*, ( SELECT count(*)  From recipes WHERE chefs.id = recipes.chef_id) AS total
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1`, [id], function(err, results) {
                if (err) throw `DATABASE ERROR ${err}`
        
                callback(results.rows[0])
        })
    },
    recipe(id, callback) {
        db.query(`
            SELECT  * 
            FROM recipes
            WHERE recipes.chef_id = $1`, [id], function(err, results) {
                if (err) throw `DATABASE ERROR ${err}`
            
                callback(results.rows)
            })
    },
    countRecipes(id, callback) {
        db.query(`
            SELECT  chefs.*, ( SELECT count(*)  From recipes WHERE chefs.id = recipes.chef_id) AS total
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
    
            callback(results.rows[0])
        })
    }
}