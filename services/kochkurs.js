const helper = require("../helper.js");
const KochkursDao = require("../dao/kochkursDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/kochkurs/gib/:id", function(request, response) {
    helper.log("Service Kochkurs: Client requested one record, id=" + request.params.id);

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var result = kochkursDao.loadById(request.params.id);
        helper.log("Service Kochkurs: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kochkurs/alle/", function(request, response) {
    helper.log("Service Kochkurs: Client requested all records");

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var result = kochkursDao.loadAll();
        helper.log("Service Kochkurs: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kochkurs/existiert/:id", function(request, response) {
    helper.log("Service Kochkurs: Client requested check, if record exists, id=" + request.params.id);

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var result = kochkursDao.exists(request.params.id);
        helper.log("Service Kochkurs: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.post("/kochkurs", function(request, response) {
    helper.log("Service Kochkurs: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.titel)) 
        errorMsgs.push("titel fehlt");
    if (helper.isUndefined(request.body.leistungen)) 
        request.body.leistungen = "";
    if (helper.isUndefined(request.body.informationen)) 
        request.body.informationen = null;
    if (helper.isUndefined(request.body.bruttopreis)) 
        errorMsgs.push("bruttopreis fehlt");
    if (!helper.isNumeric(request.body.bruttopreis)) 
        errorMsgs.push("bruttopreis muss eine Zahl sein");
   

        console.log(request.body);
   
    if (errorMsgs.length > 0) {
        helper.log("Service Kochkurs: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var result = kochkursDao.create( request.body.titel, request.body.leistungen, request.body.informationen, request.body.bruttopreis, request.body.src);
        helper.log("Service Kochkurs: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
/* ZUM ÄNDERN
serviceRouter.put("/kochkurs", function(request, response) {
    helper.log("Service Kochkurs: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.beschreibung)) 
        request.body.beschreibung = "";
    if (helper.isUndefined(request.body.details)) 
        request.body.details = null;
    if (helper.isUndefined(request.body.nettopreis)) 
        errorMsgs.push("nettopreis fehlt");
    if (!helper.isNumeric(request.body.nettopreis)) 
        errorMsgs.push("nettopreis muss eine Zahl sein");
    if (helper.isUndefined(request.body.kategorie)) {
        errorMsgs.push("kategorie fehlt");
    } else if (helper.isUndefined(request.body.kategorie.id)) {
        errorMsgs.push("kategorie gesetzt, aber id fehlt");
    }        
    if (helper.isUndefined(request.body.mehrwertsteuer)) {
        errorMsgs.push("mehrwertsteuer fehlt");
    } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
        errorMsgs.push("mehrwertsteuer gesetzt, aber id fehlt");
    }        
    if (helper.isUndefined(request.body.datenblatt)) {
        request.body.datenblatt = null;
    } else if (helper.isUndefined(request.body.datenblatt.id)) {
        errorMsgs.push("datenblatt gesetzt, aber id fehlt");
    } else {
        request.body.datenblatt = request.body.datenblatt.id;
    }
    if (helper.isUndefined(request.body.bilder)) 
        request.body.bilder = [];

    if (errorMsgs.length > 0) {
        helper.log("Service Kochkurs: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var result = kochkursDao.update(request.body.id, request.body.kategorie.id, request.body.bezeichnung, request.body.beschreibung, request.body.mehrwertsteuer.id, request.body.details, request.body.nettopreis, request.body.datenblatt, request.body.bilder);
        helper.log("Service Kochkurs: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

*/
serviceRouter.delete("/kochkurs/:id", function(request, response) {
    helper.log("Service Kochkurs: Client requested deletion of record, id=" + request.params.id);

    const kochkursDao = new KochkursDao(request.app.locals.dbConnection);
    try {
        var obj = kochkursDao.loadById(request.params.id);
        kochkursDao.delete(request.params.id);
        helper.log("Service Kochkurs: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Kochkurs: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;