var ID = ['0bba2b8487206d90a14b20e7dabb35b9']; //sys_id of the incident record

for (var i = 0; i < ID.length; i++) {
			
    var inc = new GlideRecord('incident');
    inc.get(ID[i]); 

    var tod = new GlideDateTime(inc.u_time_of_detection.getDisplayValue());
    var tos = new GlideDateTime(inc.u_time_of_start.getDisplayValue());
    var toe = new GlideDateTime(inc.u_time_of_engage.getDisplayValue());
    var tok = new GlideDateTime(inc.u_time_of_know.getDisplayValue());
    var tom = new GlideDateTime(inc.u_time_of_mitigate.getDisplayValue());
    var tor = new GlideDateTime(inc.resolved_at.getDisplayValue());
    var toi = new GlideDateTime(inc.u_time_of_impact.getDisplayValue());

    //Set Time to Detect
    var dur_sec = Math.abs(gs.dateDiff(tod.getDisplayValue(), tos.getDisplayValue(), true));
    var dur_hours = dur_sec / 3600; 
    inc.u_time_to_detect = dur_hours;
        
    //Set Time to Engage
    var dur_sec1 = Math.abs(gs.dateDiff(toe.getDisplayValue(), tod.getDisplayValue(), true));
    var dur_hours1 = dur_sec1 / 3600; 
    inc.u_time_to_engage = dur_hours1;
        
    //Set Time to Know
    var dur_sec2 = Math.abs(gs.dateDiff(tok.getDisplayValue(), toe.getDisplayValue(), true));
    var dur_hours2 = dur_sec2 / 3600; 
    inc.u_time_to_know = dur_hours2;

    //Set Time to Correct
    var dur_sec3 = Math.abs(gs.dateDiff(tom.getDisplayValue(), tok.getDisplayValue(), true));
    var dur_hours3 = dur_sec3 / 3600; 
    inc.u_time_to_correct = dur_hours3;
        
    //Set Time to Wrap
    var dur_sec4 = Math.abs(gs.dateDiff(tor.getDisplayValue(), tom.getDisplayValue(), true));
    var dur_hours4 = dur_sec4 / 3600; 
    inc.u_time_to_wrap = dur_hours4;
        
    //Set Time to Fix
    var dur_sec5 = Math.abs(gs.dateDiff(tom.getDisplayValue(), toe.getDisplayValue(), true));
    var dur_hours5 = dur_sec5 / 3600; 
    inc.u_time_to_fix = dur_hours5;
        
    //Set Time to Mitigate
    var dur_sec6 = Math.abs(gs.dateDiff(tom.getDisplayValue(), toi.getDisplayValue(), true));
    var dur_hours6 = dur_sec6 / 3600; 
    inc.u_time_to_mitigate = dur_hours6;
        
    //Set Time to Resolve
    var dur_sec7 = Math.abs(gs.dateDiff(tor.getDisplayValue(), tos.getDisplayValue(), true));
    var dur_hours7 = dur_sec7 / 3600; 
    inc.u_time_to_resolve = dur_hours7;

        gs.log("Time to Detect: " + inc.u_time_to_detect + '\n' + 
                "Time to Engage: " + inc.u_time_to_engage + '\n' +
                "Time to Know: "+ inc.u_time_to_know + '\n' +
                "Time to Correct: "+ inc.u_time_to_correct + '\n' +
                "Time to Wrap: " + inc.u_time_to_wrap + '\n' +
                "Time to Fix: " + inc.u_time_to_fix + '\n' +
                "Time to Mitigate: " + inc.u_time_to_mitigate + '\n' +
                "Time to Resolve: " + inc.u_time_to_resolve);
    inc.update();

}