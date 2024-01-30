var obj = new GlideAggregate('sys_object_source');
obj.addQuery("name", "SG-TaniumSN");
// Add aggregate
obj.addAggregate('COUNT');

obj.addQuery("target_table", "cmdb_sam_sw_install");

// Execute query
obj.query();

// Process returned records
while(obj.next()){

var msg = " has " + obj.getAggregate('COUNT') + " records." ;
gs.addInfoMessage(msg);
}