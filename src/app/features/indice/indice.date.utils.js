'use strict';
angular.module('sescGso.app.features.indice.services')
    .factory('IndiceDateUtils', function() {
        return {
            getArrayYears: function(minYear) {
                var anos = [];
                for (minYear; minYear <= moment().year(); minYear++) {
                    anos.push({
                        descricao: minYear
                    });
                }
                return anos;
            },
            getArrayMonths: function() {
                return [{
                    id: 1,
                    descricao: 'Janeiro'
                }, {
                    id: 2,
                    descricao: 'Fevereiro'
                }, {
                    id: 3,
                    descricao: 'Março'
                }, {
                    id: 4,
                    descricao: 'Abril'
                }, {
                    id: 5,
                    descricao: 'Maio'
                }, {
                    id: 6,
                    descricao: 'Junho'
                }, {
                    id: 7,
                    descricao: 'Julho'
                }, {
                    id: 8,
                    descricao: 'Agosto'
                }, {
                    id: 9,
                    descricao: 'Setembro'
                }, {
                    id: 10,
                    descricao: 'Outubro'
                }, {
                    id: 11,
                    descricao: 'Novembro'
                }, {
                    id: 12,
                    descricao: 'Dezembro'
                }];
            },
            getLabelMonth: function(monthId){
                var month = _.findWhere(this.getArrayMonths(), {
                    id: monthId
                });
                return month ? month.descricao : 'Mês inválido';            
            }
            
        };
    });