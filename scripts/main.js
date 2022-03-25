(function (window) {
    'use strict';

    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.dataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let Validation = App.Validation;

    // the remote database where we store orders
    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('12345', remoteDS);
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myTruck = myTruck;

    let formHandler = new FormHandler(FORM_SELECTOR);

    // when a checkbox is clicked, call "deliverOrder" on myTruck
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    
    // when the submit button is called, create the order and add a checkbox
    fornHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(mytruck, data);
        checkList.addRow.call(checkList, data);
    });

    // add the email validator to the email input field
    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);
