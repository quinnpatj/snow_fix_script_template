var eventsCount = 600;
var diag = new Diagnostics();
var events = diag.eventCount;

if(events > eventsCount){
    gs.log('Active events count: ' + events );
    notifyByEmail("XXXXXXX@XXXXXX", 'Events more than threshold - ' + events, 'Active events count: ' + events);
}

function notifyByEmail(recipients, subject, messageBody){
    var gr = new GlideRecord('sys_email');
    gr.initialize();
    gr.type = 'send-ready';
    gr.uid = 'N/A';
    gr.content_type = 'multipart/mixed';
    gr.subject = subject;
    gr.recipients = recipients;
    gr.body = messageBody;
    gr.insert();
}