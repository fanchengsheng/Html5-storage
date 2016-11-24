/**
 * Created by Administrator on 2016/5/10.
 */
var note = {
    datatable: null,
    db: openDatabase('MyData', '', 'My DataBase', 50 * 1024 * 1024),
    init: function() {
        datatable = document.getElementById('datatable');
        this.showAllData();

    },
    removeAllData: function() {
        for (var i = datatable.childNodes.length - 1; i >= 0; i--) {
            datatable.removeChild(datatable.childNodes[i]);
        }
        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        var th2 = document.createElement('th');
        var th3 = document.createElement('th');
        th1.innerHTML = '姓名';
        th2.innerHTML = '留言';
        th3.innerHTML = '时间';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        datatable.appendChild(tr);
    },
    showData: function(row) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = row.name;
        var td2 = document.createElement('td');
        td2.innerHTML = row.message;
        var td3 = document.createElement('td');
        var t = new Date();
        t.setTime(row.time);
        td3.innerHTML = t.toLocaleDateString() + "" + t.toLocaleTimeString();
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        datatable.appendChild(tr);
    },
    showUseTime: function(time) {
        document.getElementById("usetime").innerHTML = "<h2>使用时间:" + time + "毫秒</h2>";
    },
    showAllData: function() {
        this.db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT,time INTEGER) ', []);
            tx.executeSql('SELECT *FROM MsgData', [], function(tx, rs) {
                note.removeAllData(); //用this.removeAllData()不行
                console.log(rs);
                for (var i = 0; i < rs.rows.length; i++) {
                    note.showData(rs.rows[i]);
                }
            });
        });
    },
    addData: function(num, name, message, time) {


    },
    saveData: function(total) {
        var name = document.getElementById('name').value;
        var memo = document.getElementById('memo').value;

        var time = new Date().getTime();

        this.db.transaction(function(tx) {
            for (var i = 0; i < total; i++) {

                tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)', [name + i, memo + i, time + i], function(tx, ts) {
                    //console.log("成功保存数据！");
                    var usetime = new Date().getTime() - time;
                    console.log("插入数据" + i + "条，成功返回完成使用时间:" + usetime);
                }, function(tx, error) {
                    console.log(error.sourse + ':' + error.message);
                });

            }
            var usetime = new Date().getTime() - time;
            console.log("插入数据" + total + "条，事务完成使用时间:" + usetime);

        });
        var usetime = new Date().getTime() - time;
        console.log("插入数据函数执行完成时间:" + usetime);

        //this.showAllData();
    },
    upData: function(total) {
        var name = document.getElementById('name').value;
        var memo = document.getElementById('memo').value;

        var time = new Date().getTime();

        this.db.transaction(function(tx) {
            for (var i = 0; i < total; i++) {

                tx.executeSql('UPDATE MsgData SET message = ?, time =?  WHERE name =? ;', ["update:" + memo + i, time + i, name + i], function(tx, ts) {
                    //console.log("成功保存数据！");
                    var usetime = new Date().getTime() - time;
                    console.log("更新数据" + i + "条，成功返回完成使用时间:" + usetime);
                }, function(tx, error) {
                    console.log(error.sourse + ':' + error.message);
                });

            }
            var usetime = new Date().getTime() - time;
            console.log("更新数据" + total + "条，事务完成使用时间:" + usetime);

        });
        var usetime = new Date().getTime() - time;
        console.log("更新数据函数执行完成时间:" + usetime);
        //this.showAllData();
    }
};