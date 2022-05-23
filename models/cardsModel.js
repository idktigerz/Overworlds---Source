pool = require('./connection.js')

module.exports.getCards = async function () {
    try {
        let sql = `select * from cards`;
        let res = await pool.query(sql);
        return { status: 200, result: res.rows };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.getCardByID = async function(deckId){
    
}