'use strict';
angular.module('guideline.datatables.template', []).run([
  '$templateCache', function($templateCache) {
    $templateCache.put('guideline/datatables/table.html', '<table ng-transclude>\n</table>');
    $templateCache.put('guideline/datatables/actions-button.html', 
    	'<div class=\"actions btn-group\">' +
    		'<button class=\"btn btn-primary edit-action\" title=\"Editar\">  <i class=\"icon-pencil icon-white\"></i>  </button>'+
    		'<button class=\"btn btn-danger delete-action\" title=\"Excluir\">    <i class=\"icon-trash icon-white\"></i>  </button>'+  
    		'<button class=\"btn btn inspect-action\" title=\"Visualizar\">    <i class=\"icon-search\"></i>  </button> '+
    		'<button class=\"btn ative-inative-action\" title=\"Ativar/Suspender\">    <i class=\"icon-repeat\"></i>  </button> '+
    		'<button class=\"btn btn-danger cancelar-action\" title=\"Cancelar\">    <i class=\"icon-remove icon-white\"></i>  </button> '+
            '<button class=\"btn btn-danger encaminhar-action\" title=\"Encaminhar\">    <i class=\"icon-share-alt icon-white\"></i>  </button> '+
            '<button class=\"btn btn-danger inscrever-action\" title=\"Inscrever\">    <i class=\"icon-plus icon-white\"></i>  </button> '+
    	'</div>');
  }
]);