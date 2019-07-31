const mysql = require('mysql');
const fs = require("fs");

function startGet() {
	let fileContent = fs.readFileSync("js/option.txt", "utf8");
	option = JSON.parse(fileContent);
	if (option.work){
		clearInterval(inter);
	};
	let connection = mysql.createConnection({
	  host: "localhost",
	  user: "nichirtj_01_accs",
	  database: "nichirtj_01_accs",
	  password: "f&bnfyU6"
	});
	connection.query("SELECT * FROM `accounts`",

	function(err, results, fields) {
	    unban(results); 
	});

	connection.end();
};

function unban(count) {
	for (let i = 0; i < count.length; i++) {
		if (count[i].ban>0){
			var nban = count[i].ban-1;
			console.log(count[i].id+"^"+count[i].nickname+":  "+count[i].ban+" > "+nban);
			let fu = mysql.createConnection({
			  host: "localhost",
			  user: "nichirtj_01_accs",
			  database: "nichirtj_01_accs",
			  password: "f&bnfyU6"
			});
			fu.query("UPDATE accounts SET ban="+nban+" WHERE id="+count[i].id);
			fu.end();
		};
	};
};

var inter = setInterval(startGet, 86400000);