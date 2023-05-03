var ID = ['04b7bdc3978a61103a3c36121153af6a']; // sys_id of the change record
var newBS = 'c0fec4d5dbb35c14e287aa82ca961993'; // sys_id of the business service to be added to change record
var newCI = 'c0fec4d5dbb35c14e287aa82ca961993'; // sys_id of the CI to be added to change record
var chgNum = 'INC1433549'; // number of the change record being used to capture work

for (var i = 0; i < ID.length; i++) {
			
    var chg = new GlideRecord('change_request');
    chg.get(ID[i]);

    // Capture previous values
    var rec = chg.number.getDisplayValue();
    var oldBS = chg.business_service.getDisplayValue(); 
    var oldCI = chg.cmdb_ci.getDisplayValue();

    // Bypass business rules and workflows
    //chg.setWorkflow(false);

    // Update CI and print log showing new and previous values
    chg.business_service = newBS;
    chg.cmdb_ci = newCI;

    var log = "Business Service Updated for " + rec + " per " + chgNum + '\n' +
        "Previous Value: " + oldBS + '\n' +
        "New Value: " + chg.business_service.getDisplayValue() + '\n' +
        '\n' +
        "Configuration Item Updated for " + rec + " per " + chgNum + '\n' +
        "Previous Value: " + oldCI + '\n' +
        "New Value: " + chg.cmdb_ci.getDisplayValue();

        gs.log(log);
        chg.work_notes = log;
    
    chg.update();

}