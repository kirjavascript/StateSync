// StateSync
// thom barlow

~function() {
    
    var storage = {};

    window.stateSync = {
        select:select,
        get:get,
        set:set,
        storage:setStorage,
    };

    function set(name, data) {
        storage[name] = data;
    }

    function get(name) {
        return storage[name];
    }

    function setStorage(obj) {
        storage = obj;
    }

    function write() {
        document.getElementById("pimcore_editable___statesync__").innerHTML = JSON.stringify(storage);
    }

    function select(name) {
        
        // create a new object if one does not exist
        storage[name] = storage[name] || {};

        return Object

        .create({
            name: name,
            data: storage[name],
            obj: document.querySelector(name),
            prop: {}, // prop cache
            bind: 0,
            suck: "",

            bind: function() {
                this.bind = 1;
                return this;
            },

            // save properties to watch
            watch: function (name) {

                if(stateSync.editmode||this.bind==1) {

                    // restore prop data to element if it exists
                    if (this.data[name]) {
                        if(name[0]==".") {
                            this.obj[name.substr(1)] = this.data[name];
                        }
                        else {
                            this.obj.setAttribute(name, this.data[name]);
                        }

                    }

                    // add property name to the list
                    this.prop[name] = 1;
                }

                return this;
            },

            // choose when to save properties
            event: function (evt="change") {

                if(stateSync.editmode && this.obj) {
                    Object
                        .keys(this.prop)
                        .forEach(d => {
                            this.obj.addEventListener(evt, e => {
                                this.data[d] = 
                                    d[0]=="." ?
                                    this.obj[d.substr(1)] :
                                    this.obj.getAttribute(d);
                                write();
                            })
                        })
                }

                return this;
            },

            select: function(name) {
                this.prop = {};
                this.obj = document.querySelector(name);
                return this;
            },

            suck: function(name) {
                this.suck = name;
                return this;
            },

            spit: function(action) {
                if(typeof action=="string") {
                    console.log(this.data[this.suck])
                    this.obj[action] = this.data[this.suck];
                }
                else if(typeof action=="function") {
                    action(this.data[this.suck])
                }
                
                return this;
            }


        })
    }

} ()