var ID = ['04b7bdc3978a61103a3c36121153af6a']; //sys_id of the change record
var newCI = ['Benefits AWS Services'];

for (var i = 0; i < ID.length; i++) {
			
    var chg = new GlideRecord('change_request');
    chg.get(ID[i]);

    // Capture previous values
    var oldCI = chg.cmdb_ci.getDisplayValue();

    // Bypass business rules and workflows
    //chg.setWorkflow(false);

    // 
    chg.cmdb_ci = newCI;
    //chg.assignment_group = assignGroup;
    //chg.assigned_to = assignedTo;

        gs.log("Configuration Item Updated for " + chg.number.getDisplayValue() + '\n' +
            "Previous Value: " + oldCI + '\n' +
            "New Value: " + chg.cmdb_ci.getDisplayValue());
    
    chg.update();

}