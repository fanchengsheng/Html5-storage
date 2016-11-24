在HTML5 Web SQL中使用persistencejs做ORM的性能测试对比

** 注意事项：
1. WebSQL存储位置：C:\Users\scott.fan\AppData\Local\Google\Chrome\User Data\Default\databases
2. sql_orm.js 是使用persistencejs实现了saveData方法。

### 数据库创建
```
    var shortName = 'ORMdb';
    var version = '1.0';
    var displayName = 'ormdatabase';
    var maxSize = 50 * 1024 * 1024; // 字节
    persistence.store.websql.config(persistence, shortName,
        displayName, maxSize);
```
### 定义表结构
```
var MsgOrm = persistence.define('MsgOrm', {
    name: "TEXT",
    message: "TEXT",
    time: "INTEGER"
});
```
### 初始化表结构到数据库
` persistence.schemaSync(); `

### 向表MsgOrm插入数据
```
        var vrname = document.getElementById('name').value;
        var memo = document.getElementById('memo').value;

        var vrtime = new Date().getTime();

        for (var i = 0; i < total; i++) {
            var msg = new MsgOrm();
            msg.name = vrname + i;
            msg.message = memo + i;
            msg.time = vrtime + i;
            persistence.add(msg);

        }

        persistence.transaction(function(tx) {
            persistence.flush(tx, function() {
                var usetime = new Date().getTime() - vrtime;
                console.log("ORM插入数据" + i + "条，成功返回完成使用时间:" + usetime);
            });
        });
```
