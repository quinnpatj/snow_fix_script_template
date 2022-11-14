deleteInstall();

function deleteInstall(){
	var grInstall = new GlideRecord('cmdb_sam_sw_install');
	// Find all Software Install records created by SCCM, JAMF, or ILMT
	grInstall.addEncodedQuery('sys_created_byLIKESCCM^ORdiscovery_source=SCCM^ORsccm_group_idISNOTEMPTY^ORdiscovery_source=JAMF^ORdiscovery_source=ILMT');
	grInstall.query();
	gs.info("***INFO: Record count being deleted from cmdb_sam_sw_install table: " + grInstall.getRowCount());
	// Bypass business rules and workflows
	grInstall.setWorkflow(false);
	// Delete all records in the query result
	grInstall.deleteMultiple();
}