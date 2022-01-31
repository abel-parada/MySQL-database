# Database classs

This database class is a general purpose class for creating and using Maradb/MySQL queries. The constructor takes all necessary information needed to open a database connection as parameter object.

The layer is used between the database engine and our application.

The constructor takes one parameter. Example:

```js
const options = {
  host: "localhost",
  port: 3306,
  user: "zeke",
  password: "secret",
  database: "employeedb",
  allowPublicKeyRetrieval: true, //mysql users add this
};
```

## Usage

```js
const db = new Database(options);
```

## **doQuery(sql,parameters)**

Method has two parameters:

- `sql`: is a sql statement as a string
- `parameters`: an array of query parameters to be used in place of the questuon marks `?` in the sql statement. Parameters may also be omitted if the sql statement has no placeholder `?` in it.

### Usage

#### No parameters needed

```js
const result = await db.doQuery("select * from employee");
```

#### Query criterion is employeeId=1

```js
const result = await db.doQuery("select * from employee where employeeId=?", [
  1,
]);
```

Return value of select:
for example:

```js
{
  queryResult: [
    {
      employee: 1,
      firstname: 'Matt',
      lastname: 'River',
      department: 'finance',
      salary: 7000
    }
  ],
  resultSet:ture
}
```

#### insert, update, delete, etc.

##### Insert

```js
const result = await db.query("insert into emplyee values (?,?,?,?,?)", [
  6,
  "Petra",
  "Bond",
  "admin",
  8000,
]);
```

Returns a Promise. Returned value is an object of the form:

```js
{
    queryResult:{rowsChanged:1, insertId:0, status:0}
    resultSet: false
}
```
