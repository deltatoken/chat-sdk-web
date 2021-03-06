angular.module('myApp.services').factory('AutoLogin', ["$window", "Credential", "Room", "RoomStore", "Utils", function ($window, Credential, Room, RoomStore, Utils) {
    return {

        username: "",
        password: "",
        roomID: "",
        updated: false,

        updateParameters: function () {
            if (this.updated) {
                return;
            }

            let pairs = $window.location.search.replace("?", "").split("&");

            for(var i = 0; i < pairs.length; i++) {
                let values = pairs[i].split("=");
                if(values.length === 2) {
                    let key = values[0];
                    let value = values[1];

                    if (key === UsernameKey) {
                        this.username = value;
                    }
                    if (key === PasswordKey) {
                        this.password = value;
                    }
                    if (key === RoomIDKey) {
                        this.roomID = value;
                    }
                }
            }

            // If the parameters aren't set, check the config options
            if (this.username === "" && !Utils.unORNull(ChatSDKOptions.username)) {
                this.username = ChatSDKOptions.username;
            }
            if (this.password === "" && !Utils.unORNull(ChatSDKOptions.password)) {
                this.password = ChatSDKOptions.password;
            }
            if (this.roomID === "" && !Utils.unORNull(ChatSDKOptions.roomID)) {
                this.roomID = ChatSDKOptions.roomID;
            }

            this.updated = true;
        },

        autoLoginEnabled: function () {
            this.updateParameters();
            return this.username !== "" && this.password !== "";
        },

        getCredentials: function() {
            if (this.autoLoginEnabled()) {
                return new Credential().emailAndPassword(this.username, this.password);
            } else {
                return null;
            }
        },

        // username=1@d.co&password=123456&roomID=123

        tryToJoinRoom: function () {
            this.updateParameters();
            if (this.roomID !== "") {
                let room = RoomStore.getRoomWithID(this.roomID);
                if (Utils.unORNull(room)) {
                    Room.createRoomWithRID(this.roomID, this.roomID, "", true, RoomTypeGroup, true, 0);
                } else {

                }
                //


            }
        }

    }
}]);