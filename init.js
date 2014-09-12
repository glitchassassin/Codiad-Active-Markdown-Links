/*
 *  Copyright 2014 Glitch Assassin
 */

(function(global, $){
    
    // Define core
    var codiad = global.codiad,
        scripts= document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    // Instantiates plugin
    $(function() {    
        codiad.aml.init();
    });

    codiad.aml = {
        
        // Allows relative `this.path` linkage
        path: curpath,

        init: function() {
            // When editor switches to a new editor instance...
            codiad.editor.addInstance = (function(_super) {
                return function (session, where) {
                    _super.apply(this, [session, where]);

                    // ...And update mouse handler object:
                    codiad.editor.activeInstance._defaultHandlers.dblclick = (function(_super) {
                        return function(evt) {
                            _super.apply(this, [evt]);
                            if (codiad.editor.activeInstance.session.$modeId == "ace/mode/markdown")
                            {
                                console.log(evt);
                                var token_clicked = codiad.editor.activeInstance.session.getTokenAt(evt.$pos.row, evt.$pos.column)
                                if (token_clicked.type == "markup.underline") {
                                    // Selected token is formatted with markup.underline, meaning it's a link.
                                    var UrlRegexp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                                    if (UrlRegexp.test(token_clicked.value))
                                    {
                                        // Reference is a web link - open in new browser tab/window
                                        window.open(token_clicked.value);
                                    }
                                }
                            }
                        }
                    })(codiad.editor.activeInstance._defaultHandlers.dblclick)
                };
            })(codiad.editor.addInstance);
        }
    };

})(this, jQuery);