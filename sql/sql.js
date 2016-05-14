var db= openDatabase('mydb','1.0','TestDB',2*1024*1024)
/*transaction 用来执行事务处理：如果在访问数据库过程中，正在操作的数据库
* 被别的用户修改掉的话，会引起很多意想不到的结果。
* 使用事务的目的是:在操作完成前，阻止别的用户访问数据库*/
db.transaction(function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXIST LOGS(id unique,Log)');
});
