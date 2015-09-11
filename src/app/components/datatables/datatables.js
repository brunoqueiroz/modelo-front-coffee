// Code here will be linted with JSHint.
/* jshint ignore:start */

'use strict';

angular.module('guideline.datatables', ['guideline.datatables.template', 'guideline.datatables.service'])
    .config(function() {
        $.fn.dataTableExt.ofnSearch['string'] = function(data) {
            if (!data) {
                return '';
            } else {
                if (typeof data === 'string') {
                    return data.replace(/[ãáâàåäÃÁÂÀÅÄ]/g, 'a').replace(/[íìîïÍÌÎÏ]/g, 'i').replace(/[úùûüÚÙÛÜ]/g, 'u').replace(/[éèêëÉÈÊË]/g, 'e').replace(/[õóòôöÕÓÒÔÖ]/g, 'o').replace(/[çÇ]/g, 'c').replace(/[ñÑ]/g, 'n');
                } else {
                    return data;
                }
            }
        };
        return $.extend(true, $.fn.dataTable.defaults, {
            'oLanguage': {
                'sEmptyTable': 'Nenhum resultado encontrado',
                'sProcessing': '<span class="loader"></span>'
            }
        });
    })
    .directive('datatableHeading', [
        function() {
            return {
                restrict: 'A',
                require: '^guidelineDatatables',
                link: function(scope, element, attrs, controller) {
                    if (scope.column.htmlTitle) {
                        element.html(scope.column.htmlTitle);

                        if (angular.isDefined($(scope.column.htmlTitle).attr('fnClick'))) {
                            $(element.children()).on('click', function() {
                                controller.scope.onclick($(scope.column.htmlTitle).attr('fnClick'), this.checked);
                            });
                        }
                    } else {
                        element.text(scope.column.title);
                    }
                    if (scope.$last) {
                        controller.scope.drawTable();
                        return;
                    }
                }
            };
        }
    ])
    .directive('guidelineDatatables', [
        '$templateCache', '$timeout',
        function($templateCache, $timeout) {
            return {
                templateUrl: 'guideline/datatables/table.html',
                controller: function($scope) {
                    this.scope = $scope;
                },
                transclude: true,
                restrict: 'EA',
                replace: true,
                scope: {
                    guidelineDatatables: '@',
                    options: '='
                },
                link: function(scope, element, attrs) {
                    var $buttons, $listeners, $table, createArrayString, createButtons, createData, createGroupOptions, deleteRow, encaminharRow, inscreverRow, cancelarRow, getRow, init, removeListeners, selectedRow, editedRow, selectedRows, linkCollumn, checkboxCollumn, ativeInativeRow, setConfig, setHelpers, setListeners;
                    $table = void 0;
                    $listeners = false;
                    $buttons = false;

                    scope.$watch('options.filterOpts', function(newValue) {
                        if (angular.isDefined(newValue)) {
                            $table._fnReDraw();
                        }
                    }, true);

                    selectedRow = function(row) {
                        var base;
                        return typeof(base = scope.options).selectedRow === 'function' ? base.selectedRow(row, $table) : void 0;
                    };
                    editedRow = function(row) {
                        var base;
                        return typeof(base = scope.options).editedRow === 'function' ? base.editedRow(row, $table) : void 0;
                    };
                    deleteRow = function(row, index) {
                        var base;
                        return typeof(base = scope.options).deleteRow === 'function' ? base.deleteRow(row, index, $table) : void 0;
                    };
                    encaminharRow = function(row, index) {
                        var base;
                        return typeof(base = scope.options).encaminharRow === 'function' ? base.encaminharRow(row, index, $table) : void 0;
                    };
                    inscreverRow = function(row, index) {
                        var base;
                        return typeof(base = scope.options).inscreverRow === 'function' ? base.inscreverRow(row, index, $table) : void 0;
                    };
                    cancelarRow = function(row, index) {
                        var base;
                        return typeof(base = scope.options).cancelarRow === 'function' ? base.cancelarRow(row, index, $table) : void 0;
                    };
                    linkCollumn = function(row) {
                        var base;
                        return typeof(base = scope.options).linkCollumn === 'function' ? base.linkCollumn(row, $table) : void 0;
                    };
                    checkboxCollumn = function(row) {
                        var base;
                        return typeof(base = scope.options).checkboxCollumn === 'function' ? base.checkboxCollumn(row, $table) : void 0;
                    };
                    ativeInativeRow = function(row, index) {
                        var base;
                        return typeof(base = scope.options).ativeInativeRow === 'function' ? base.ativeInativeRow(row, index, $table) : void 0;
                    };
                    selectedRows = function() {
                        var rows;
                        rows = [];
                        $('tbody > tr.selected', $table).each(function() {
                            return obj.push(getRow(this._DT_RowIndex));
                        });
                        return $timeout(function() {
                            var base;
                            return typeof(base = scope.options).selectedRows === 'function' ? base.selectedRows(rows) : void 0;
                        });
                    };
                    getRow = function(index) {
                        return scope.options.data[index] || null;
                    };

                    scope.$on('guideline-datatables:redraw', function() {
                        if ($table) {
                            return $table._fnReDraw();
                        }
                    });

                    scope.onclick = function(fnClick, param1) {
                        var fn = scope.options[fnClick];
                        return fn(param1);
                    };

                    createArrayString = function(list, property) {
                        var i, index, item, len, results, string;
                        string = '';
                        results = [];
                        for (index = i = 0, len = list.length; i < len; index = ++i) {
                            item = list[index];
                            if (property) {
                                string += item[property];
                            }
                            if (!property) {
                                string += item;
                            }
                            if ((index + 1) !== list.length) {
                                string += ', ';
                            }
                            results.push(string);
                        }
                        return results;
                    };
                    createData = function() {
                        var col, i, j, len, len1, obj, ref, ref1, row, val, values;
                        obj = [];
                        ref = scope.options.data;
                        for (i = 0, len = ref.length; i < len; i++) {
                            row = ref[i];
                            values = [];
                            ref1 = scope.options.columns;
                            for (j = 0, len1 = ref1.length; j < len1; j++) {
                                col = ref1[j];
                                if (angular.isArray(row[col.index])) {
                                    values.push(createArrayString(row[col.index], col.useProp));
                                } else {
                                    if (col.formatter) {
                                        val = col.formatter(row);
                                    } else {
                                        val = row[col.index];
                                    }
                                    if (!val) {
                                        val = ' - ';
                                    }
                                    if (typeof val !== 'number') {
                                        val = val.toString();
                                    }
                                    values.push(val);
                                }
                            }
                            obj.push(values);
                        }
                        return obj;
                    };
                    removeListeners = function() {
                        var ref;
                        $listeners = false;
                        $('#' + attrs.id + ' > tbody > tr button.edit-action').off('click');
                        $('#' + attrs.id + ' > tbody > tr button.delete-action').off('click');
                        if ((ref = scope.options.config) != null ? ref.selectable : void 0) {
                            return $('#' + attrs.id + ' > tbody > tr').off('click');
                        }
                    };
                    setListeners = function() {
                        var ref;
                        if (!$listeners) {
                            $('#' + attrs.id + ' > tbody > tr a.link-collumn').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return linkCollumn(obj);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr input.checkbox-collumn').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement._DT_RowIndex;
                                $timeout(function() {
                                    return checkboxCollumn(scope.options.data[$rowIndex]);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr button.inspect-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return selectedRow(obj);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr button.edit-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return editedRow(obj);
                                });
                            });
                            $('#' + attrs.id + ' > tbody > tr button.delete-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return deleteRow(obj, $rowIndex);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr button.encaminhar-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return encaminharRow(obj, $rowIndex);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr button.inscrever-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return inscreverRow(obj, $rowIndex);
                                });
                            });

                            $('#' + attrs.id + ' > tbody > tr button.cancelar-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return cancelarRow(obj, $rowIndex);
                                });
                            });
                            $('#' + attrs.id + ' > tbody > tr button.ative-inative-action').on('click', function() {
                                var $rowIndex, obj;
                                $rowIndex = this.parentElement.parentElement.parentElement._DT_RowIndex;
                                obj = {};
                                angular.forEach(getRow($rowIndex), function(value, key) {
                                    obj[key] = value;
                                });
                                $timeout(function() {
                                    return ativeInativeRow(obj, $rowIndex, $table);
                                });
                            });
                            if ((ref = scope.options.config) != null ? ref.selectable : void 0) {
                                $('tbody > tr', $table).on('click', function(event) {
                                    if (event.target.tagName === 'TR' || event.target.tagName === 'TD') {
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');
                                        } else {
                                            $(this).addClass('selected');
                                        }
                                    }
                                });
                            }
                            $(window).resize(function() {
                                return $($table).css({
                                    width: $($table).parent().parent().width()
                                });
                            });
                            $listeners = true;
                        }
                    };
                    createGroupOptions = function() {
                        var obj, ref, ref1;
                        if (scope.grouped) {
                            return;
                        }
                        obj = {};
                        obj.bExpandableGrouping = true;
                        _.defaults(obj, (ref = scope.options.config) != null ? ref.groupConfig : void 0);
                        if ((ref1 = scope.options.config) != null ? ref1.group : void 0) {
                            $table.rowGrouping(obj);
                            scope.grouped = true;
                        }
                    };
                    createButtons = function(grouped) {
                        var $actionsButton, $selector, ref;
                        if (!$buttons && ((ref = scope.options.config) != null ? ref.actionButtons : void 0)) {
                            $selector = void 0;
                            $actionsButton = $templateCache.get('guideline/datatables/actions-button.html');
                            if (!scope.options.group) {
                                $selector = 'tbody > tr';
                            } else {
                                $selector = 'tbody > tr[class*='
                                group - item - ']';
                            }
                            if (scope.options.group && !grouped) {
                                return;
                            }
                            $($selector, $table).each(function(index, element) {
                                var $lastCell;
                                $lastCell = $('td', this).last();
                                if (!$lastCell.hasClass('dataTables_empty' || !$lastCell.hasClass('group-item-expander'))) {
                                    if (!$lastCell.hasClass('action-cell')) {
                                        $lastCell.addClass('action-cell');
                                        $lastCell.prepend($actionsButton);
                                        if (scope.editButton === false) {
                                            $('button.edit-action', $lastCell).hide();
                                        }
                                        if (scope.deleteButton === false) {
                                            $('button.delete-action', $lastCell).hide();
                                        }
                                        if (scope.encaminharButton === false) {
                                            $('button.encaminhar-action', $lastCell).hide();
                                        }
                                        if (scope.inscreverButton === false) {
                                            $('button.inscrever-action', $lastCell).hide();
                                        }
                                        if (scope.inspectButton === false) {
                                            $('button.inspect-action', $lastCell).hide();
                                        }
                                        if (scope.ativeInativeButton === false) {
                                            $('button.ative-inative-action', $lastCell).hide();
                                        }
                                        if (scope.cancelarButton === false) {
                                            $('button.cancelar-action', $lastCell).hide();
                                        }
                                    }
                                }
                            });
                            $buttons = true;
                        }
                    };
                    setHelpers = function() {
                        return createGroupOptions();
                    };
                    setConfig = function() {
                        var config;
                        config = {};
                        if (scope.options.config) {
                            config.bInfo = true;
                            config.bDeferRender = true;
                            config.bPaginate = scope.options.config.bPaginate || false;
                            config.bProcessing = scope.options.config.bProcessing || false;
                            config.bServerSide = scope.options.config.bServerSide || false;
                            config.sAjaxSource = scope.options.config.sAjaxSource || null;
                            config.fnServerData = scope.options.config.fnServerData || null;
                            config.bSort = scope.options.config.bSort || false;
                            config.aoColumnDefs = scope.options.config.aoColumnDefs || [];
                            config.aoColumn = scope.options.config.aoColumn || [];

                            config.fnDrawCallback = function(oSettings) {
                                
                                //QBG especifico para este projeto
                                $('tbody > tr', $table).each(function(index, element) {

                                    var obj = {};
                                    angular.forEach(getRow(index), function(value, key) {
                                        obj[key] = value;
                                    });

                                    var ultimaColuna = $('td', element).last();

                                    if (obj.situacao === 'S') {
                                        $(element).addClass('disabled');
                                        $(ultimaColuna).find('.ative-inative-action').attr('title', 'Ativar');
                                        $(ultimaColuna).find('.ative-inative-action').children().attr('class', 'icon-repeat');
                                        
                                        if(!obj.podeReativar){
                                            $(ultimaColuna).find('.ative-inative-action').hide();
                                        }
                                    } else {
                                        if (obj.situacao !== 'AG') {
                                            $(ultimaColuna).find('button.cancelar-action').hide();
                                        }
                                        $(ultimaColuna).find('.ative-inative-action').attr('title', 'Suspender');
                                        $(ultimaColuna).find('.ative-inative-action').children().attr('class', 'icon-ban-circle');
                                    }

                                    if(obj.situacao === 'E'){
                                        $(ultimaColuna).find('.ative-inative-action').hide();
                                    }

                                    if (scope.options.config.getSituacaoFiltro) {
                                        if (scope.options.config.getSituacaoFiltro() !== 'AV') {
                                            $(ultimaColuna).find('button.encaminhar-action').hide();
                                        }
                                        if (scope.options.config.getSituacaoFiltro() !== 'N_IN') {
                                            $(ultimaColuna).find('button.inscrever-action').hide();
                                        }
                                    }
                                });
                                // fim melhorar o codigo acima

                                return element.parent().find('.table-footer .dataTables_info').html('Total: ' + ($table.fnPagingInfo().iTotal));
                            };

                            scope.editButton = angular.isDefined(scope.options.config.editButton) ? scope.options.config.editButton : true;
                            scope.deleteButton = angular.isDefined(scope.options.config.deleteButton) ? scope.options.config.deleteButton : true;
                            scope.encaminharButton = angular.isDefined(scope.options.config.encaminharButton) ? scope.options.config.encaminharButton : true;
                            scope.inscreverButton = angular.isDefined(scope.options.config.inscreverButton) ? scope.options.config.inscreverButton : true;
                            scope.inspectButton = angular.isDefined(scope.options.config.inspectButton) ? scope.options.config.inspectButton : true;
                            scope.ativeInativeButton = angular.isDefined(scope.options.config.ativeInativeButton) ? scope.options.config.ativeInativeButton : true;
                            scope.cancelarButton = angular.isDefined(scope.options.config.cancelarButton) ? scope.options.config.cancelarButton : false;

                            config.fnInfoCallback = function(oSetting, iStart, iEnd, iMax, iTotal, sPre) {
                                $buttons = false;
                                removeListeners();
                                createButtons(true);
                                return setListeners();
                            };
                        }
                        return config;
                    };
                    init = function() {
                        var config;
                        config = setConfig();
                        if (!$table) {
                            $table = $('#' + attrs.id).dataTable(config).fnSetFilteringDelay(1000);
                        }
                        setHelpers();
                        setListeners();
                    };
                    scope.drawTable = function() {
                        init();
                    };
                    $timeout(function() {
                        scope.$digest();
                    }, 2000);
                }
            };
        }
    ]);
// Code here will be ignored by JSHint.
/* jshint ignore:end */