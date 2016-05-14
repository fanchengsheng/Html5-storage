	/*这部分代码是为了适应不同版本的浏览器*/
	window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	window.IDBtransaction = window.IDBTransaction || window.webkitIDBTransction || window.msIDBTransaction || window.mozIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
	window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.mozIDBCursor || window.msIDBCursor;
	var myIndexedDB = (function() {
	    var dbName = 'MyData',
	        dbVersion = 20150512,
	        idb,
	        datatable;
	    var removeAllData = function() {
	        /* body... */
	        for (var i = datatable.childNodes.length - 1; i > 0; i--) {
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
	    };
	    var showData = function(dataObject) {
	        /* body... */
	        var tr = document.createElement('tr');
	        var td1 = document.createElement('td');
	        td1.innerHTML = dataObject.name;
	        var td2 = document.createElement('td');
	        td2.innerHTML = dataObject.memo;
	        var td3 = document.createElement('td');
	        var t = new Date();
	        t.setTime(dataObject.time);
	        tr.appendChild(td1);
	        tr.appendChild(td2);
	        tr.appendChild(td3);
	        datatable.appendChild(tr);
	    };
	    var showAllData = function() {
	        /* body... */
	        removeAllData();
	        var tx = idb.transaction(['MsgData'], IDBTransaction.READ_ONLY);
	        var store = tx.objectStore('MsgData');
	        var range = IDBKeyRange.lowerBound(1);
	        var direction = IDBCursor.NEXT;
	        var req = store.openCursor(range, direction);
	        req.onsuccess = function() {
	            /* body... */
	            var cursor = this.result;
	            if (cursor) {
	                showData(cursor.value);
	                cursor.continue;
	            }
	        }
	    };
	    var addData = function(name, message, time) {
	        /* body... */
	        var tx = idb.transaction(['MsgData'], IDBTransaction.READ_ONLY);
	        tx.oncomplete = function() {
	            /* body... */
	            alert('保存数据成功');
	        }
	        tx.onabort = function() {
	            /* body... */
	            alert('保存数据失败');
	        }
	        var store = tx.objectStore('MsgData');
	        var value = {
	            name: name,
	            message: message,
	            time: time
	        };
	        store.put(value);
	    };
	    return {
	        init: function() {
	            // 建立数据库连接
	            console.log('建立数据库连接');
	            var dbConnect = indexedDB.open(dbName, dbVersion);
	            // dbConnect.onsuccess = function(e) {
	            //     idb = e.target.result;
	            //     datatable = document.getElementById('datatable');
	            //     console.log('数据库连接成功')
	            // }
	            dbConnect.onsuccess=function (e) {
	            	 /* body... */ 
	            	 idb=e.target.result;
	            	 datatable=document.getElementById('datatable');
	            	 var currentVersion=idb.version;
	            	 var setVersion=idb.setVersion(dbVersion);
	            	 setVersion.onsuccess=function (e) {
	            	 	 /* body... */ 
	            	 	 if(!(idb.ObjectStoreNames.contains('MsgData'))){
	            	 	 	var tx=e.target.transaction;
	            	 	 	tx.onabort=function (e) {
	            	 	 		 /* body... */ 
	            	 	 		 alert('对象仓库创建失败');
	            	 	 	}
	            	 	 	var name='MsgData';
	            	 	 	var optionalParameters={
	            	 	 		keyPath:'id',
	            	 	 		autoIncrement:true
	            	 	 	};
	            	 	 	var store=idb.createObjectStore(name,optionalParameters);
	            	 	 	alert('对象仓库创建成功');
	            	 	 }
	            	 }
	            }
	            dbConnect.onerror = function() {
	                alet("数据库连接失败！")
	            }
	            // dbConnect.onupgaradeneeded = function(e) {
	            //     /* body... */
	            //     console.log('数据库连接成功，更新版本');
	            //     idb = e.target.result;
	            //     if (!(idb.ObjectStoreNames.contains('MsgData'))) {
	            //         var tx = e.target.transaction;
	            //         tx.onabort = function(e) {
	            //             /* body... */
	            //             alert('对象仓库创建失败');
	            //         }
	            //         var name = 'MsgData';
	            //         var optionalParameters = {
	            //             keyPath: 'id',
	            //             autoIncrement: true
	            //         };
	            //         var store = idb.createObjectStore(name, optionalParameters);
	            //         alert('对象创建成功'); // body...  )
	            //     }
	            // }

	        },
	        saveData: function() {
	            /* body... */
	            var name = document.getElementById('name').value;
	            var memo = document.getElementById('memo').value;
	            var time = new Date().getTime();
	            addData(name, memo, time);
	            showAllData();
	        }

	    }

	}())
