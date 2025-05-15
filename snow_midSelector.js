//function midSelector() {
	var queryString = gs.getProperty('TS_Tech_Fee_Export_MidServer');
	gs.log('TS_Tech_Fee_Export_MidServer Value: ' + queryString)

	grMS = new GlideRecord("ecc_agent");
	grMS.addQuery("host_name", "CONTAINS", queryString);
	grMS.setLimit(1);
	grMS.query();
	if (grMS.next()) {
		midServer = grMS;
		//return midServer.name;
		gs.log('MID Name: ' + midServer.name);
	}
//}