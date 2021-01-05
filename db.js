const sql = require('mssql');

module.exports.query = async (config,query) => {
    
    try {
        await sql.connect(`mssql://${config.user}:${config.password}@${config.server},${config.port}/${config.database}`);
        let result = await sql.query(query);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
    }

}