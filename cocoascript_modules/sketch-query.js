(function(){
    var root = this;
    var SketchQuery = {};

    SketchQuery.findOne = function(collection,predicate) {
        var filter=NSPredicate.predicateWithFormat(predicate);
        return collection.filteredArrayUsingPredicate(filter).firstObject();
    };

    SketchQuery.find = function(collection,predicate) {
        var result=collection.filteredArrayUsingPredicate(NSPredicate.predicateWithFormat(predicate));
        if(result.count()<1) return null;

        return result;
    };

    root.SketchQuery = SketchQuery;

}).call(this);