const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    create(data ,callback) {
        const query = `
            INSERT INTO recipes (
                title, 
                image, 
                ingredients, 
                preparation, 
                information,
                created_at,
                chef_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.img,
            data.ingredients,
            data.step,
            data.recipeInfo,
            date(Date.now()).iso,
            data.chef_id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
        })

    },
    chefOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })
    },
    all(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef 
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)`, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows)
        })
    },
    detail(id, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef 
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
    
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chef
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback(results.rows[0])
            })
    },
    update(data, callback) {
        const query = `
            UPDATE recipes SET
            title=($1), 
            image=($2), 
            ingredients=($3), 
            preparation=($4), 
            information=($5),
            chef_id=($6)
        WHERE id = ($7)
        RETURNING id`

        const values = [
            data.title,
            data.image,
            data.ingredients,
            data.step,
            data.recipeInfo,
            data.chef_id,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`
            
            callback(results.rows[0])
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
            if (err) throw `DATABASE ERROR ${err}`

            callback()
        })
    }
}