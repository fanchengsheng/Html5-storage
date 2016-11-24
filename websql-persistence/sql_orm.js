/**
 * Created by Administrator on 2016/5/10.
 */
var MsgOrm = persistence.define('MsgOrm', {
    name: "TEXT",
    message: "TEXT",
    time: "INTEGER"
});

var orm = {

    init: function() {
        persistence.debug = 0;
        try {
            if (!window.openDatabase) {
                // 当前浏览器没有数据库支持
                console.log('当前浏览器没有数据库支持.');
            } else {
                var shortName = 'ORMdb';
                var version = '1.0';
                var displayName = 'ormdatabase';
                var maxSize = 50 * 1024 * 1024; // 字节
                persistence.store.websql.config(persistence, shortName,
                    displayName, maxSize);
                //定义一张表
                persistence.schemaSync();
            }
        } catch (e) {
            // 这里开始异常处理 . 
            if (e == INVALID_STATE_ERR) {
                // 数据库版本异常 . 
                alert("Invalid database version.");
            } else {
                alert("Unknown error " + e + ".");
            }
        }
    },

    showUseTime: function(time) {
        document.getElementById("usetime").innerHTML = "<h2>使用时间:" + time + "毫秒</h2>";
    },

    saveData: function(total) {
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

        var usetime = new Date().getTime() - vrtime;
        console.log("ORM插入数据函数执行完成时间:" + usetime);

        //this.showAllData();
    },
    upData: function() {
        var name = document.getElementById('name').value;
        var memo = document.getElementById('memo').value;
        var startime = new Date().getTime();

        var usertime = new Date().getTime() - startime;
        console.log("使用时间:" + usertime);
        this.showUseTime(usertime);
        //this.showAllData();
    }
};