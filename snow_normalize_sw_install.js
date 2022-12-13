// adapted from OOB "Create a Software Normalization" business rule

function insertRecord() {
	// do not create discovery models for "Security Update" installations
	var matchString = 'security update';
	var installationName = current.primary_key;
	if (installationName.toLowerCase().indexOf(matchString) > -1) {
		return;
	}

	var displayName = !gs.nil(current.normalized_display_name) ? current.normalized_display_name : current.display_name;
	var adjustedDisplayName = (!gs.nil(current.edition) && (current.getValue('edition') !== 'NULL'))
		? (displayName + ' ' + current.edition)
		: displayName;

	// Query for an existing discovery model by primary key
	var gr = new GlideRecord('cmdb_sam_sw_discovery_model');
	gr.addQuery('primary_key', current.primary_key);
	gr.query();
	if (!gr.next()) {
		var lock = new GlideLock(current.primary_key);
		try {
			// Create a lock on the primary key to prevent duplicate discovery models
			lock.get();

			// Query again to confirm DM again
			gr.query();
			if (!gr.next()) {
				var adjustedVersion = (current.getValue('version') === 'NULL') ? '' : current.version;
				var adjustedNormVersion = (current.getValue('normalized_version') === 'NULL')
					? ''
					: current.normalized_version;
				// If no discovery model found, create one
				// Use normalized fields if filled
				gr.initalize();
				gr.primary_key = current.primary_key;
				gr.publisher = !gs.nil(current.normalized_publisher) ? current.normalized_publisher : current.publisher;
				gr.version = !gs.nil(adjustedNormVersion) ? adjustedNormVersion : adjustedVersion;
				gr.display_name = adjustedDisplayName;
				gr.revision = !gs.nil(current.normalized_revision) ? current.normalized_revision : current.revision;
				gr.prod_id = current.prod_id;
				if (current.getValue('discovery_source') === 'Citrix') {
					gr.discovery_source = 'Citrix';
				}
				if (current.getValue('discovery_source') === 'Engineering Software') {
					gr.discovery_source = 'Engineering Software';
				}
				gr.status = 'new';
				if (GlidePluginManager.isActive('com.snc.samp')) {
					var normalizationEngine = new NormalizationEngine();
					normalizationEngine.normalizeDiscoveryModelRecord(gr);
				}
				gr.insert();
			}
		} finally {
			// Release the lock now that either the discovery model was inserted or located
			lock.release();
		}
	}

	current.discovery_model = gr.sys_id;
	if (!gs.nil(gr.norm_product)
		&& gr.norm_type.toString() === 'licensable'
		&& !gr.norm_product.ignore_installs) {
		var display = SAMPremiumUtils.calculateNormDisplayName(gr);
		current.setValue('norm_product', gr.getValue('norm_product'));
		current.setValue('norm_publisher', gr.getValue('norm_publisher'));
		current.setValue('normalized_display_name', display);
	} else {
		SAMPremiumUtils.clearNormFieldsForInstallGr(current);
	}
}

insertRecord();