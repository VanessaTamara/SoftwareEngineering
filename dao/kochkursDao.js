const helper = require("../helper.js");

class KochkursDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        

        var sql = "SELECT * FROM Kochkurs WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

       return helper.objectKeysToLower(result);

    }

    loadAll() {
        var sql = "SELECT * FROM Kochkurs";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        return  helper.arrayObjectKeysToLower(result);

    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Kochkurs WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }
    

    create( titel = "", leistungen = "", informationen = "", bruttopreis = 0.0, src = "") {
       // const produktbildDao = new ProduktbildDao(this._conn);

        var sql = "INSERT INTO Kochkurs (Titel,Leistungen,Informationen,Bruttopreis,src) VALUES (?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [titel, leistungen, informationen, bruttopreis, src];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        return this.loadById(result.lastInsertRowid);
      
    }
/*
    update(id, kategorieid = 1, bezeichnung = "", beschreibung = "", mehrwertsteuerid = 1, details = null, nettopreis = 0.0, datenblattid = null, bilder = []) {
        const produktbildDao = new ProduktbildDao(this._conn);
        produktbildDao.deleteByParent(id);

        var sql = "UPDATE Kochkurs SET KategorieID=?,Bezeichnung=?,Beschreibung=?,MehrwertsteuerID=?,Details=?,Nettopreis=?,DatenblattID=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [kategorieid, bezeichnung, beschreibung, mehrwertsteuerid, details, nettopreis, datenblattid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        if (bilder.length > 0) {
            for (var element of bilder) {
                produktbildDao.create(element.bildpfad, id);
            }
        }

        var updatedObj = this.loadById(id);
        return updatedObj;
    }
*/
    delete(id) {
        try {
            
            var sql = "DELETE FROM Kochkurs WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("KochkursDao [_conn=" + this._conn + "]");
    }
    
}

module.exports = KochkursDao;