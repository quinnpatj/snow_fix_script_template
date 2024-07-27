updateField();

function updateField(){
    var gr = new GlideRecord('sys_user_preference');
	gr.addEncodedQuery('name=rowcount^value=100^ORvalue=50');
    //gr.setLimit(10);
    gr.query();

    // Loop through each record and update the field
    while (gr.next()) {
    gr.setValue('value', '20');
    gr.update();
    }
}