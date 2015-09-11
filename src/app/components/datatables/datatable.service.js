'use strict';
angular.module('guideline.datatables.service', [])
    .factory('DataTableUtils', function() {
        return {
            fnServerData: function(sSource, oaData, fnCallback, oSettings, serviceGet, filtro, columns, options) {
                var page;
                var getNameSorting = function() {
                    var indexCol = oSettings.aaSorting[0][0];
                    return columns[indexCol].index;
                };

                var getDirection = function() {
                    return oSettings.aaSorting[0][1];
                };

                page = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength);
                return serviceGet(page, oSettings._iDisplayLength, oSettings.oInstance.fnSettings().oPreviousSearch.sSearch, getNameSorting(), getDirection(), filtro)
                    .success(function(result) {

                        var dataTablesData, dataToArray;
                        options.data = result.content ? result.content: result;

                        dataTablesData = {
                            aaData: result.content ? result.content: result,
                            iTotalRecords: result.content ? result.totalElements : result.length,
                            iTotalDisplayRecords: result.content ? result.totalElements : result.length,
                            sEcho: oSettings.iDraw
                        };

                        dataToArray = function(result) {
                            var obj = [];
                            var dados = result.content ? result.content : result;
                            _.each(dados, function(row) {
                                var values = [];

                                _.each(columns, function(col) {
                                    if (angular.isArray(row[col.index])) {
                                        values.push(createArrayString(row[col.index], col.useProp));
                                    } else {
                                        var val;
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
                                });
                                obj.push(values);
                            });
                            dataTablesData.aaData = obj;
                        };
                        dataToArray(result);
                        return fnCallback(dataTablesData);
                    });
            }
        };
    });