gs.log('Delete table_name records: starting to delete records older than 1-01-22');
deleteBulk();

function deleteBulk(){
	var gr = new GlideRecord('table_name'); 
	gr.addEncodedQuery("sys_updated_on<javascript:gs.dateGenerate('2022-01-01','00:00:00')");
	gr.query();
	gs.log('Delete table_name records: ' + count + ' records have been deleted');
	var count = 0;
	while(gr.next()){
		//gr.getRowCount();
		gr.deleteRecord();
		
		count += 1;
	}
	
	gs.log('Delete table_name records: ' + count + ' records have been deleted');

}