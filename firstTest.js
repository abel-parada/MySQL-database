'use strict';

const MariaDb = require('./database');

const options = {
    host: "localhost",
    port: 3306,
    user: "zeke",
    password: "secret",
    database: "employeedb",
    allowPublicKeyRetrieval: true, //mysql users add this
  };

  const db = new MariaDb(options);

  // db.doQuery('select * from employee').then(console.log).catch(console.log);


  function printWorkers(employees){
      for(let person of employees){
          console.log(`${person.employeeId}: ${person.firstname} ${person.lastname}`+` Dept: ${person.department}, ${person.salary} €`);
      }
  }

  async function getAll (){
      try{
        const result = await db.doQuery('select * from employee');
        if (result.resultSet){
                printWorkers(result.queryResult);
        }
      }
      catch(error){
          console.log(error);
      }
  }

async function get(id){
    try{
        const result = await db.doQuery('select * from employee where employeeId=?',[id]);
        printWorkers(result.queryResult);
    }
    catch(error){
        console.log(error)
    }
}

async function add(person){
    try{
        // const parameters = [
        //     person.employeeId,
        //     person.firstname,
        //     person.lastname,
        //     person.department,
        //     person.salary
        // ];
        // the following line is line the previous 6 ones ;)
        const parameters = Object.values(person);
        const sql='insert into employee values(?,?,?,?,?)';
        const status = await db.doQuery(sql, parameters);
        console.log('Status', status);
    }
    catch(error){
        console.log(error);
    }
}

async function remove(id){
    try{
        const sql='delete from employee where employeeId=?';
        const status = await db.doQuery(sql, [id]);
        console.log('Status removed', status);
    }
    catch(error){
        console.log(error);
    }
}

async function update(person){
    try{
        const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? ' + 'where employeeId=?';
        const parameters = [
            person.firstname,
            person.lastname,
            person.department,
            person.salary,
            person.employeeId
        ];
        const status = await db.doQuery(sql, parameters);
        console.log('Status update: rowsChanged= ', status.queryResult.rowsChanged);
    }
    catch(error){
        console.log(error);
    }
}


async function run(){
    console.log('\n#### get all ####')
    await getAll();

    console.log('\n#### get 1 ####')
    await get(1);

    console.log('\n#### get 2 ####')
    await get(2);

    console.log('\n#### remove 200 ####')
    await remove(200);
    
    console.log('\n#### add ####')
    const newEmp = {
        employeeId:200,
        firstname: 'Paul',
        lastname:'White',
        department: 'cleaning',
        salary: 1000
    }
    await add(newEmp);
    await getAll();

    console.log('\n#### update ####')
    const updateEmp={
        employeeId:1,
        firstname:'Jose',
        lastname:'Parada',
        department:'logistics',
        salary:3000
    };
    await update(updateEmp);
    await getAll();
};

run();