(function(){

    function createImage(title,keystroke) {

        var group=MSLayerGroup.alloc().init();

        var rectangle=group.addLayerOfType("rectangle").embedInShapeGroup();
        var fill=rectangle.style().fills().addNewStylePart();

        var color=MSColor.colorWithSVGString("#5B5B5B");
        color.alpha=0.9;
        fill.color=color;

        var padding = {
            horz: 20,
            vert: 10
        };

        var subGroup=MSLayerGroup.alloc().init();

        // Title text.
        var text=subGroup.addLayerOfType("text");
        text.stringValue=title;
        text.fontSize=16;
        text.fontPostscriptName="Helvetica Neue"
        var fill=text.style().fills().addNewStylePart();
        fill.color=MSColor.whiteColor();
        text.adjustFrameToFit();


        var keystrokeText=subGroup.addLayerOfType("text");
        keystrokeText.stringValue=keystroke;
        keystrokeText.fontSize=40;
        keystrokeText.fontPostscriptName="Helvetica Neue"
        var fill=keystrokeText.style().fills().addNewStylePart();
        fill.color=MSColor.whiteColor();
        keystrokeText.adjustFrameToFit();

        keystrokeText.frame().y=text.frame().maxY()+10;

        subGroup.resizeRoot(true);

        keystrokeText.frame().midX=subGroup.frame().midX();
        text.frame().midX=subGroup.frame().midX();

        // var rect=GKRect.rectWithUnionOfRects([text.frame().GKRect(),keystrokeText.frame().GKRect()]);
        var rect=subGroup.frame().GKRect();
        rect.expandXBy_yBy(padding.horz,padding.vert);
        rectangle.frame().size=rect.size();

        subGroup.frame().mid=rectangle.frame().mid();


        var borderRadius=text.fontSize()*0.3;
        rectangle.layers().firstObject().cornerRadiusFloat=borderRadius;

        group.addLayers([subGroup]);
        group.resizeRoot(true);

        var page=doc.currentPage();
        page.addLayers([group]);



        var defaults=NSUserDefaults.standardUserDefaults();
        var bitmapFlattenScale=defaults.floatForKey("bitmapFlattenScale");
        defaults.setFloat_forKey(NSScreen.isOnRetinaScreen() ? 2 : 1,"bitmapFlattenScale");

        var flattener=MSLayerFlattener.alloc().init();
        var image=flattener.imageFromLayers([group]);

        defaults.setFloat_forKey(bitmapFlattenScale,"bitmapFlattenScale");
        page.removeLayer(group);

        return image;
    }

    function displayImage(image,delay) {
        doc.displayMessage_timeout("",delay);
        var window=doc.messageWindow();

        var textField=window.contentView().subviews().firstObject();
        [textField setHidden:true];

        var contentView=window.contentView();
        contentView.wantsLayer=true;

        [window setBackgroundColor:[NSColor clearColor]];
        // [window setOpaque:false];
        [window setHasShadow:false];

        [[window contentView] layer].contents = image;

        var width=image.size().width;
        var height=image.size().height;

        var frame=contentView.frame();

        frame.size.width=width;
        frame.size.height=height;

        contentView.setFrame(frame);

        var frame=window.frame();

        var midX=NSMidX(frame);

        frame.origin.x=Math.round(midX-width/2);
        frame.size.width=width;
        frame.size.height=height;

        [window setFrame: frame display:true animate:false];
    }

    var root = this;

    var Narrator = {};

    Narrator.displayCommands = true;

    Narrator.command = function(title,keystroke,delay) {
        if(!this.displayCommands) return;

        var delay=delay || 2;
        var image=createImage(title,this.humanizeKeystroke(keystroke));
        displayImage(image,delay);

    };

    Narrator.message = function(str) {
        if(this.displayCommands) return;
        doc.displayMessage(str);
    };

    Narrator.humanizeKeystroke = function(keystroke) {
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
            down: '\u2193'
        };

        var str="";
        var parts=keystroke.split("-");
        for(var i=0;i<parts.length;i++) {
            var part=parts[i];
            if(keyMap[part]) {
                str+=keyMap[part];
            } else {
                str+=part.toUpperCase();
            }
        }

        return str;
    };

    root.Narrator = Narrator;

}).call(this);