function saveStorage(id) {
    var data = document.getElementById(id).value;
    var time = new Date().getTime();//把时间值作为索引
    localStorage.setItem(time, data);
    alert('数据已保存');
    loadStorage('msg'); // 加载数据...  
}

function loadStorage(id) {
    var result = '<table border="1">';
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var date = new Date();
        date.setTime(key);
        var datastr = date.toGMTString;
        result += '<tr><td>' + value + '</td><td>' + datastr + '</td></tr>';
    } // body...  
    result += '</table>';
    var target = document.getElementById(id);
    target.innerHTML = result;
}
function clearStorage () {
	 localStorage.clear();
	 alert("清除本地数据库数据");
	 loadStorage('msg');// body...  
}