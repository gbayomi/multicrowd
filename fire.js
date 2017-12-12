var admin = require("firebase-admin");
var serviceAccount = require("./fb_key/artic-f85f4-firebase-adminsdk-fciw5-4fd88a568b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://artic-f85f4.firebaseio.com"
});

function FirebaseHandler() {
    this.db = admin.database();
}

FirebaseHandler.prototype.add = function(_key, new_obj) {
	var ref = this.db.ref(_key);
	ref.update(new_obj);
}

FirebaseHandler.prototype.get = function(_key, callback) {
	var ref = this.db.ref(_key);
	ref.once("value", function(snapshot) {
	  callback(snapshot.val())
	});
}

FirebaseHandler.prototype.createTask = function(new_obj) {
	_key = 'Tasks'
	this.add(_key, new_obj)
}

FirebaseHandler.prototype.createLabels = function(new_obj) {
	_key = 'Labels'
	this.add(_key, new_obj)
}

module.exports = FirebaseHandler;