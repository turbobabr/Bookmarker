(function(){
    var root = this;
    var SketchQuery = {};

    SketchQuery.findOne = function(collection,predicate) {
        var args = Array.prototype.slice.call(arguments, 2);
        var filter=NSPredicate.predicateWithFormat_argumentArray(predicate,args);
        return collection.filteredArrayUsingPredicate(filter).firstObject();
    };

    SketchQuery.find = function(collection,predicate) {
        var args = Array.prototype.slice.call(arguments, 2);
        var filter=NSPredicate.predicateWithFormat_argumentArray(predicate,args);
        var result=collection.filteredArrayUsingPredicate(filter);
        if(result.count()<1) return null;

        return result;
    };

    root.SketchQuery = SketchQuery;

}).call(this);