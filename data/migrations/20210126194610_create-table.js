
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('userId');
            tbl.text('username')
                .notNullable();
            tbl.text('password')
                .notNullable();
            tbl.text('department');
        });
};

exports.down = function(knex) {
  
};
