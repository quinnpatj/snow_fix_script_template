new GlideQuery('sys_user')
    .where('active', true)
    .where('user_name', 'walt.disney')
    .select('user_name', 'sys_id', 'mobile_phone')
    .forEach(function(u) {
        gs.info('\n' + 'user name = ' + u.user_name + '\n' + 'sys_id = ' + u.sys_id + '\n' + 'mobile phone = ' + u.mobile_phone);
    });