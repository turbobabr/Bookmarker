(function(){
    this.utils = {
        colorWithHex: function(str,alpha) {
            var alpha = alpha || 1;
            var color = MSColor.colorWithSVGString(str);
            color.alpha = alpha;

            return color;
        },

        generateGUID: function() {
            return NSUUID.UUID().UUIDString().UTF8String();
        },

        showRulers: function(show) {
            if((show && !doc.isRulersVisible()) || (!show && doc.isRulersVisible())) {
                doc.toggleRulers();
            }
        },

        showSelection: function(show) {
            var defaults = NSUserDefaults.standardUserDefaults();
            var isVisible=defaults.boolForKey("MSNormalEventDrawSelection");
            if((show && !isVisible) || (!show && isVisible)) doc.toggleSelection(null);
        },

        rectFromGKRect: function(rect) {
            return {
                x: rect.x(),
                y: rect.y(),
                width: rect.width(),
                height: rect.height()
            };
        },

        GKRectFromRect: function(rect) {
            return GKRect.rectWithRect(NSMakeRect(rect.x,rect.y,rect.width,rect.height));
        },

        currentPage: function(){
            return doc.currentPage();
        },

        createMetaLayer: function(id,data) {

            var shape=MSShapeGroup.alloc().init();
            shape.name = id;
            shape.isVisible=false;
            shape.isLocked=true;

            var metaStorage = MSShapePathLayer.alloc().init();
            metaStorage.name = data;
            shape.addLayers([metaStorage]);

            return shape;
        },

        deselectAllLayers: function(){
            doc.documentData().deselectAllLayers();
        },

        // Typer.
        isString: function(obj) {
            return toString.call(obj)=="[object String]";
        },

        isNull: function(obj) {

        },

        isDefined: function(obj) {
            return toString.call(obj)!="[object Undefined]";
        },

        isUndefined: function(obj) {
            return toString.call(obj)=="[object Undefined]";
        },

        isArray: function(obj) {
            return Array.isArray(obj);
        },

        isFunction: function(obj) {
            return toString.call(obj)=="[object Function]";
        },

        isNSObject: function(obj) {
            return toString.call(obj)=="[object MOBoxedObject]";
        },

        typeOf: function(obj) {
            return toString.call(obj);
        }

    };



    var BorderPosition = {
        Center: 0,
        Inside: 1,
        Outside: 2,
        Both: 3
    };

    var Shaper = {
        rect: function(rect,fill,border,radius) {

            var shape=MSRectangleShape.alloc().init();
            shape.frame().origin=NSMakePoint(rect.x,rect.y);
            shape.frame().size=NSMakeSize(rect.width,rect.height);

            if(radius) {
                if(utils.isString(radius)) {
                    shape.setCornerRadiusFromComponents(radius);
                } else {
                    shape.cornerRadiusFloat=radius;
                }
            }

            var shapeGroup=MSShapeGroup.alloc().init();
            shapeGroup.addLayers([shape]);

            this.fill(shapeGroup,fill || { color: "#dddddd",alpha: 1});
            if(border) this.border(shapeGroup,border);

            shapeGroup.resizeRoot(true);

            return shapeGroup;
        },
        fill: function(layer,obj) {
            var fill = (layer.style().fill()) ? layer.style().fill() : layer.style().fills().addNewStylePart();
            fill.color = utils.colorWithHex(obj.color,obj.alpha);
        },
        border: function(layer,obj) {
            var border = (layer.style().border()) ? layer.style().border() : layer.style().borders().addNewStylePart();
            border.color = utils.colorWithHex(obj.color,obj.alpha);
            border.thickness = utils.isDefined(obj.thickness) ? obj.thickness : border.thickness();
            border.position = utils.isDefined(obj.position) ? obj.position : border.position();
        }

    };

    var View = {
        centerRect: function(rect,animated) {
            var animated = animated || true;
            this.view().centerRect_animated(rect,animated);
        },
        totalRect: function(layers) {
            return this.view().totalRectForLayers(layers);
        },
        zoomToSelection: function() {
            this.view().zoomToSelection();
        },
        centerLayersInCanvas: function() {
            this.view().centerLayersInCanvas();
        },
        view: function(){
            return doc.currentView();
        }
    };

    this.BorderPosition = BorderPosition;
    this.Shaper = Shaper;
    this.View = View;


}).call(this);
