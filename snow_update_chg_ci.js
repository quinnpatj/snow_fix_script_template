/* JOEL PROD VERSION:

    
Fix Script for Reassociating CI to Closed Change Request

PROD 
CHG0217181 6f9eac5787b9ed108df97488dabb3514
CHG0220692 04b7bdc3978a61103a3c36121153af6a
Benefits AWS Services c0fec4d5dbb35c14e287aa82ca961993

    var changeRecordsSysId = ['6f9eac5787b9ed108df97488dabb3514','04b7bdc3978a61103a3c36121153af6a']; 

    var updateCISysId = 'c0fec4d5dbb35c14e287aa82ca961993';

    for (var i in changeRecordsSysId) {
        var grChgStatetoNew = new GlideRecord('change_request');
        grChgStatetoNew.addEncodedQuery('sys_id='+ changeRecordsSysId[i]);
        grChgStatetoNew.query();
        if(grChgStatetoNew.next()){
            grChgStatetoNew.state = -5;
            grChgStatetoNew.setWorkflow(false);
            grChgStatetoNew.update();
        }
    var grUpdateCIRecord = new GlideRecord('change_request');
        grUpdateCIRecord.addEncodedQuery('sys_id='+ changeRecordsSysId[i]);
        grUpdateCIRecord.query();
        if(grUpdateCIRecord.next()){
            grUpdateCIRecord.cmdb_ci = updateCISysId;
            grUpdateCIRecord.update();
        }
    var grChgStatetoClosed = new GlideRecord('change_request');
            grChgStatetoClosed.addEncodedQuery('sys_id='+ changeRecordsSysId[i]);
            grChgStatetoClosed.query();
        if(grChgStatetoClosed.next()){
            grChgStatetoClosed.state = 3;
            grChgStatetoClosed.setWorkflow(false);
            grChgStatetoClosed.update();
        }
    }
*/

var ID = ['04b7bdc3978a61103a3c36121153af6a']; // sys_id of the change record
var newBS = 'c0fec4d5dbb35c14e287aa82ca961993'; // sys_id of the business service to be added to change record
var newCI = 'c0fec4d5dbb35c14e287aa82ca961993'; // sys_id of the CI to be added to change record
var chgNum = 'INC1433549'; // number of the change record being used to capture work

for (var i = 0; i < ID.length; i++) {
	
    /* REWORK BELOW USING THIS EXAMPLE
    
    // Set the sys_id of the change request you want to update
    var changeId = "<CHANGE REQUEST SYS_ID>";
    // Set the sys_id of the configuration item you want to add
    var ciId = "<CONFIGURATION ITEM SYS_ID>";
    // Get the change request record
    var change = new GlideRecord('change_request');
    change.get(changeId);
    // Reopen the change request
    change.setValue('state', 1); // 1 = "Open"
    change.update();
    // Add the configuration item to the "Affected CIs" related list
    var affectedCIs = new GlideRecord('task_ci');
    affectedCIs.setValue('task', changeId);
    affectedCIs.setValue('ci_item', ciId);
    affectedCIs.setValue('task_type', 'change_request');
    affectedCIs.insert();
    // Close the change request again
    change.setValue('state', 3); // 3 = "Closed"
    change.update();

    // ALTERNATIVE VERSION

    var changeRecordsSysId = ['6f9eac5787b9ed108df97488dabb3514','04b7bdc3978a61103a3c36121153af6a'];
    var updateCISysId = 'c0fec4d5dbb35c14e287aa82ca961993';
    var grChangeRequest = new GlideRecord('change_request');
    grChangeRequest.addQuery('sys_id', 'IN', changeRecordsSysId);
    grChangeRequest.query();
    while (grChangeRequest.next()) {
        grChangeRequest.state = -5;
        grChangeRequest.cmdb_ci = updateCISysId;
        grChangeRequest.state = 3;
    }
    grChangeRequest.setWorkflow(false);
    grChangeRequest.updateMultiple();

    */

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
    ChangeCollisionHelper.addCiToChangeAffectedCis(newCI, chg.sys_id);

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