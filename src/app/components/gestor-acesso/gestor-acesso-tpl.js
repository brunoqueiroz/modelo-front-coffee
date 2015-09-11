'use strict';
angular.module('guideline.gestorAcesso.template', []).run([
    '$templateCache',
    function($templateCache) {
        $templateCache.put('guideline/gestor-acesso/gestor-acesso.html', '<a class=\"link-permissions\">{{itemLabel}}</a>');
        $templateCache.put('guideline/gestor-acesso/gestor-acesso-modal.html', '<div id=\"gestor-acesso-modal\" style=\"z-index: 10001 !important;\" class=\"modal modal-permission hide\">\n	<div class=\"modal-header\">\n	  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n	  <h3>Permissões de acesso</h3>\n	</div>\n	<div class=\"modal-body\" style=\"max-height: 505px\">\n	  <iframe width=\"100%\" height=\"500px\" style=\"border: 0; margin: 0px;\"></iframe>\n	</div>\n</div>');
    }
]);