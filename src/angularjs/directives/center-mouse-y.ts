// This is used by the profile box - to keep it centered on the
// mouse's y axis until we move into it
import * as $ from 'jquery'
import * as angular from 'angular'
import {IProfileBoxScope} from "../controllers/user-profile-box";


angular.module('myApp.directives').directive('centerMouseY', ['$document', 'Screen', function ($document, Screen) {
    return function (scope: IProfileBoxScope, elm) {

        $(elm).hover(() => {
            scope.hover = true;
        }, () => {
            scope.hover = false;
        });

        $document.mousemove((e) => {
            //!elm.is(":hover")
            if(scope.currentUser && !scope.hover) {
                // Keep the center of this box level with the mouse y
                elm.css({bottom: Screen.screenHeight - e.clientY - $(elm).height()/2});
            }
        });
    };
}]);