'use strict';

angular.module('redspark.components.security')
    .provider('SecurityTranslate', function() {
        return {
            pt_BR: function(){
              return {
                exception: {
                    'aplicacao.nao.encontrada': 'Aplicação não encontrada',
                    'usuario.ou.senha.invalidos': 'Usuário inválido',
                    'bad.credentials': 'Bad credencials',
                    'usuario.desativado': 'Usuário Desativado',
                    'erro.generico': 'Ocorreu um erro não identificado, por favor contate Admin.',
                    'service.unavailable': 'Serviço indisponível',
                    'usuario.nao.autenticado': 'Usuário não autorizado',
                    'bad.request': 'Bad Request',
                    'periodo.com.agendamento': 'A edição não é possível, pois já existem agendamentos para esse périodo de avaliação',
                    'agendamento.horario.lotado': 'Número de vagas já atingido para este horário',
                    'busca.matricula.nao.encontrada': 'Matrícula não foi encontrada',
                    'ja.possui.inscricao':'Essa matrícula já possui uma inscrição nesse período',
                    'inscricao.nao.encontrada': 'inscrição não encontrada',
                    'periodo.inscricao.inicio.menor.que.hoje': 'O inicio do período de inscrição é menor que a data atual',
                    'periodo.avaliacao.inicio.menor.que.hoje':'O inicio do período de inscrição é menor que a data atual',
                    'acessonegado':'Não autorizado'
                }
              };
            },

            //ACESSO SOMENTE EM UM CRONTROLLER VERIFICAR MELHOR DEPOIS
            $get: function() {
              return this.pt_BR();
            }
        };

    });