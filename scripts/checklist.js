(function (window) {
    'use strict'
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    
    // when the checkbox is clicked get the email address from the row
    // and then call the function (func) that is passed in with the email as a parameter
    CheckList.prototype.addClickHandler = function (func) {
        this$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    // remove a new identified by an email address
    CheckList.prototype.removeRow = function (email) {
        this.$element
           .find('[value="' + email + '"]')
           .closet('[data-coffee-order="checkbox"]')
           .remove();
    };

    // the method that adds a new row to the checklist
    CheckList.prototype.addRow = function (coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);
        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$elemnt);
    };

    // Each Row is one outstanding order
    function Row(coffeeOrder) {
        let $div = $('<div></div>', {
            'data-coffee-order': 'checklist',
            'class': 'checkbox'
        });
      let $label = $('<label></label>');

      let $checkbox = $('<input></input>', {
          type: 'checkbox',
          value: coffeeOrder.emailAddress
      });
    }
    let description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
        description += coffeeOrder.flavor + ' ';
    
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';

    this.$element = $div;
   }  
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    App.ChekcList = CheckList;
    window.App = App;    
})(window);