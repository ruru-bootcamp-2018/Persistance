
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intentions').del()
    .then(function () {
      // Inserts seed entries
      return knex('intentions').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
