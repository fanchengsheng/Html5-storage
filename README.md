#本地存储#
- sessionStorage
- localStorage
sessionStorage.setItem('key','value')
变量=sessionStorage.getItem('key','value')
* * *
或者
sessionStorage.key='value'
变量=sessionStorage.key
* * *

localStorage.setItem('key','value')
localStorage.getItem('key','value')
* * *
或者
localStorage.key='value'
变量=localStorage.key

##简单示例##
localstorage.html
storage.js

#本地数据库#
本地数据库是H5之后出现的SQLLite数据库，可以通过SQL语言来访问文件型SQL数据库
使用数据库的步骤：
1 创建访问数据库
2 使用事务处理


##创建访问数据库对象##
var db= openDatabase('mydb','1.0','TestDB',2*1024*1024)
第一个参数：数据库名
第二个参数：版本号
第三个参数：数据库描述
第四个参数：数据库大小
该方法返回创建后的数据库访问对象，如果该数据库不存在，则创建数据库
##用executeSql执行查询##
transaction.executeSql(sqlquery,[],dataHandler,errorHandler);
第一个参数：查询语句
第二个参数：查询语句中的？
eg: transaction.executeSql("UPDATE people set age=? which name=?",[age,name])
第三个参数：执行成功时调用的回调函数
function dataHandler(transaction,result){//回调函数内容}
第四个参数：执行失败时调用的回调函数
function errorHandler(transaction,erromsg){//alert("执行出错！")}
##transaction##
'
//查询数据表中的数据
        this.db.transaction(function(tx){
            //创建数据表，如果不存在MsgData就创建，不然就不创建
            tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT,time INTEGER) ',[]);
            //查询数据表中的数据，rs是返回的数据，tx是事务
            tx.executeSql('SELECT *FROM MsgData',[],function(tx,rs){
                note.removeAllData();//用this.removeAllData()不行
                console.log(rs);
                for(var i=0;i<rs.rows.length;i++){
                    note.showData(rs.rows[i]);
                }
            });
        });
'

'
//向数据表中插入一条数据
       this.db.transaction(function(tx){
            tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)',[name,message,time],function(tx,ts) {
                alert("成功保存数据！");
            }, function (tx,error) {
                alert(error.sourse+':'+error.message);
            });
        });
'
#indexedDB数据库#
indexedDB，顾名思义，就是带有索引的数据库，是在HTML5中新增的数据库，改数据库是一种存储在客户端本地的NoSQL数据库，目前Chrome11+版本，Firefox4+版本，IE10版本的浏览器对其提供支持。
##连接数据库##
//连接数据库
var dbName='indexedDBTest';
var dbVersion=20120603;
var dbConnect=indexedDB.open(dbName,dbVersion);
//关闭数据库连接
db.close（）；
##数据库的版本更新##
1 低版本的浏览器
var setVersion=idb.setVersion(dbVersion);
setVersion.onsuccess=function(e){
    var tx=e.target.transaction;
    //对数据库的操作
}
2 高版本的浏览器
var dbConnect=indexedDB.open(dbName,dbVersion);
dbConnect.onsuccess=function(e){//执行连接成功的语句};
dbConnect.onerror=function(){//执行连接失败的语句};
dbConnect.onupgradeneeded=function(e){
/*当连接数据库时发现指定的版本号大于数据库当前版本号时触发该事件
更新事务开启，同时数据库的版本号自动更新完毕*/}

##创建对象仓库##
idb=e.target.result;//连接数据库后获取的结果
var tx=e.target.transaction;
var name='Users1';
var store=idb.createObjectStore(name,optionalParameters);

##创建索引##
var name='userNameIndex';
var keyPath='username';
var idx=store.createIndex(name,keyPath,optionalParameters);

##索引的multiEntry属性值##
##使用事务##
事务的类型有：
- 只读事务
- 读写事务
- 更新事务
var tx=idb.transaction(storeNames,mode);

##保存数据##
var store=idb.objectStore('Users');
var value={
    userId:1,
    userName:'张三',
    address:'住址1'
};
var req=store.put(value);

##获取数据##
从对象仓库获取一条数据
var req=store.get(1)
get方法返回一个IDBRequest对象

##根据主键值检索数据##
使用bound方法
var range=IDBKeyRange.bound(1,4)
var direction=IDBCursor.NEXT;
var req=store.openCursor(range,direction);
使用only方法
var range=IDBKeyRange.key(value);
使用lowerBound方法
var range=IDBKeyRange.lowerBound(lower,lowerOpen);
使用upperBound方法
var range=IDBKeyRange.upperBound(upper,upperOpen)