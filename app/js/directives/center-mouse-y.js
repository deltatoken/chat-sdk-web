// This is used by the profile box - to keep it centered on the
// mouse's y axis until we move into it
angular.module('myApp.directives').directive('centerMouseY', ['$document', 'Screen', function ($document, Screen) {
    return function (scope, elm) {

        elm.hover(function () {
            scope.hover = true;
        }, function () {
            scope.hover = false;
        });

        $document.mousemove((function (e) {
            //!elm.is(":hover")
            if(scope.currentUser && !scope.hover) {
                // Keep the center of this box level with the mouse y
                elm.css({bottom: Screen.screenHeight - e.clientY - elm.height()/2});
            }
        }).bind(this));
    };
}]);
