var ID = ['04b7bdc3978a61103a3c36121153af6a']; // sys_id of the change record
var newCI = ['Benefits AWS Services']; // New CI name to be added to change record

for (var i = 0; i < ID.length; i++) {
			
    var chg = new GlideRecord('change_request');
    chg.get(ID[i]);

    // Capture previous values
    var oldCI = chg.cmdb_ci.getDisplayValue();

    // Bypass business rules and workflows
    //chg.setWorkflow(false);

    // Update CI and print log showing new and previous values
    chg.cmdb_ci = newCI;

        gs.log("Configuration Item Updated for " + chg.number.getDisplayValue() + '\n' +
            "Previous Value: " + oldCI + '\n' +
            "New Value: " + chg.cmdb_ci.getDisplayValue());
    
    chg.update();

}