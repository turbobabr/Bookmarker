(function(){
    var root = this;

    var SpeakerDeck = {};


    var keyMap = {
        cmd: '\u2318',
        command: '\u2318',
        ctrl: '\u2303',
        control: '\u2303',
        alt: '\u2325',
        option: '\u2325',
        shift: '\u21e7',
        enter: '\u23ce',
        left: '\u2190',
        right: '\u2192',
        up: '\u2191',
        down: '\u2193',
        delete: "⌫"
    };

    /*

    var shiftKeyMap = {
        '~': '`',
        '_': '-',
        '+': '=',
        '|': '\\',
        '{': '[',
        '}': ']',
        ':': ';',
        '"': '\'',
        '<': ',',
        '>': '.',
        '?': '/'
    };*/


    function humanizeKeyStroke(str) {
        var parts=str.split("-");

        var stroke="";
        for(var i=0;i<parts.length;i++) {
            var part=parts[i];
            if(keyMap[part]) {
                stroke+=keyMap[part];
            } else {
                stroke+=part[0].toUpperCase()+part.substring(1);
            }
        }
        return stroke;
    }


    SpeakerDeck.showKeyStoke = function(keyStroke,name) {
        return;
        // var html="<button class='btn btn-danger' style='font-size:50px;line-height: 50px;paddin-bottom: 0px;'>"+humanizeKeyStroke(keyStroke)+"<br><span style='font-size:20px;'>"+name+"</span></button>";
        keyStroke=humanizeKeyStroke(keyStroke);
        var html="<button class='btn btn-info'>"+keyStroke+"</button> "+" <strong class='text-muted'>"+name+"</strong> ";

        var html='<div class="keystroke-background"><div class="keystroke text-center">'+keyStroke+'</div><div class="keystroke-title text-center">'+name+'</div></div>';
        //print(html);
        SketchConsole.customPrint(html);

        SketchConsole.refreshConsole();
    };

    root.SpeakerDeck = SpeakerDeck;

}).call(this);;