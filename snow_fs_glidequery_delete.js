new GlideQuery('sys_user')
	.where('active', true)
    .where('sys_id', 'a3586ba2830a12107f44f2c279da1e1c')
    .deleteMultiple();