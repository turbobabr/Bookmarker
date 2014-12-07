// An auxiliary module for external app navigation.
#import 'bookmarks.js'
(function(){
    // print($data);
    var meta = Bookmarker.meta();
    var bookmarks=meta.bookmarks;
    for(var i=0;i<bookmarks.length;i++) {
        var bookmark=bookmarks[i];
        if(bookmark.id==$data.bookmarkID) {
            Bookmarker.navigateToBookmark(bookmark,bookmark.slot);
            break;
        }
    }
})();