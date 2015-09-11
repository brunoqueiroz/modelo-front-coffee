'use strict';

angular.module('sescGso.app.features.indice')
    .provider('IndiceTranslate', function() {
        return {
            pt_BR: function() {
                return {
                    breadcrumb: {
                        'indices': 'Índices'
                    },
                    indice: {
                        INDICE_CORRECAO: 'Índices de correção',
                        ADICIONAR: 'Adicionar',
                        ANO: 'Ano',
                        MES: 'Mês',
                        VALOR_ANO: 'Valor referente ao ano',
                        VALOR_MES: 'Valor referente ao mês',
                        SALVAR: 'Salvar',
                        OBRIGATORIO: 'Este campo é requerido',
                        CANCELAR:'Cancelar',
                        INDICE_SALVO: 'Indice salvo'
                    }
                };
            },

            //ACESSO SOMENTE EM UM CRONTROLLER VERIFICAR MELHOR DEPOIS
            $get: function() {
                return this.pt_BR();
            }
        };

    });