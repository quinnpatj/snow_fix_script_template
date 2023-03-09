var ID = ['fab981f14745a118626a0b8a436d4346']; //sys_id of the incident record

for (var i = 0; i < ID.length; i++) {
			
    var inc = new GlideRecord('incident');
    inc.get(ID[i]);

    // Capture previous values
    var stateOld = inc.major_incident_state.getDisplayValue();
    var assignGroup = inc.assignment_group.getDisplayValue();
    var assignedTo = inc.assigned_to.getDisplayValue();

    gs.print(assignGroup);
    gs.print(assignedTo);

    // Bypass business rules and workflows
    //inc.setWorkflow(false);

    // Set Major Incident State
    inc.major_incident_state = 'accepted';
    //inc.assignment_group = assignGroup;
    //inc.assigned_to = assignedTo;

        gs.log("Major Incident State Updated" + '\n' +
            "Previous Value: " + stateOld + '\n' +
            "New Value: " + inc.major_incident_state.getDisplayValue());
    
    inc.update();

}