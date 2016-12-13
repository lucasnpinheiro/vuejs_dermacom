<template>
  <div style="width:100%;">
    <div style="background: #efefef;">
      <div class=" columns is-gapless">
        <div class="column is-6">
          <h1 class="title">Paciente Editar</h1>
        </div>
        <div class="column is-6 text-right menu-acoes">
          <button v-show="isCarregando" class="button is-primary is-loading is-small">
            <i aria-hidden="true" class="fa fa-spinner"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-plus-circle"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-pencil-square"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-floppy-o"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-times-circle"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-list"></i>
          </button>
          <button class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-print"></i>
          </button>
        </div>
      </div>
    </div>


    <form autocomplete="off">

      <div class=" columns is-gapless">
        <div class="column is-10">
          <div class=" columns is-gapless">
            <div class="column is-2">
              <label class="label">ID</label>
              <p class="control" style="width: 100%;">
                <span class="input disabled">{{paciente.id}}</span>
              </p>
            </div>
            <div class="column is-3">
              <label class="label">CPF</label>
              <p class="control">
                <input class="input" type="text" autofocus v-model="paciente.cpf" v-bind="cpfMask" autocomplete="off" maxlength="14">
              </p>
            </div>
            <div class="column">
              <label class="label">Nome</label>
              <p class="control">
                <input class="input" type="text" v-model="paciente.nome" autocomplete="off" maxlength="255">
              </p>
            </div>
          </div>


          <div class=" columns is-gapless">
            <div class="column">
              <label class="label">Sexo</label>
              <p class="control">
                <select class="select" style="width: 100%;" v-model="paciente.sexo_id" autocomplete="off">
                  <option>Selecione uma Sexo</option>
                  <option v-for="item in sexos" v-bind:value="item.id">{{item.nome}}</option>
                </select>
              </p>
            </div>
            <div class="column">
              <label class="label">Nascimento</label>
              <p class="control">

                <input class="input" type="date" v-model="paciente.data_nascimento" autocomplete="off">
              </p>
            </div>
            <div class="column">
              <label class="label">Idade</label>
              <p class="control" style="width: 100%;">
                <span class="input disabled">{{paciente.data_nascimento | idade}}</span>
              </p>
            </div>
            <div class="column">
              <label class="label">Situção</label>
              <p class="control">
                <select class="select" style="width: 100%;" v-model="paciente.status" autocomplete="off">
                  <option>Selecione uma Situação</option>
                  <option value="0">Inativo</option>
                  <option value="1">Ativo</option>
                </select>
              </p>
            </div>
          </div>

          <div class=" columns is-gapless">

            <div class="column">
              <label class="label">Identidade/Local</label>
              <p class="control">
                <input class="input" type="text" v-model="paciente.rg" autocomplete="off" maxlength="45">
              </p>
            </div>
            <div class="column">
              <label class="label">Nº. Cartão SUS</label>
              <p class="control">
                <input class="input" type="text" v-model="paciente.cartao_sus" autocomplete="off" maxlength="45">
              </p>
            </div>
            <div class="column">
              <label class="label">Estado Civil</label>
              <p class="control">
                <select class="select" style="width: 100%;" v-model="paciente.estados_civil_id" autocomplete="off">
                  <option>Selecione um Estado Civil</option>
                  <option v-for="item in estadosCivils" v-bind:value="item.id">{{item.nome}}</option>
                </select>
              </p>
            </div>
            <div class="column">
              <label class="label">Escolaridade</label>
              <p class="control">
                <select class="select" style="width: 100%;" v-model="paciente.escolaridade_id" autocomplete="off">
                  <option>Selecione uma Escolaridade</option>
                  <option v-for="item in escolaridades" v-bind:value="item.id">{{item.nome}}</option>
                </select>
              </p>
            </div>
            <div class="column">
              <label class="label">Profissão</label>
              <p class="control">
                <select class="select" style="width: 100%;" v-model="paciente.profissao_id" autocomplete="off">
                  <option>Selecione uma Profissão</option>
                  <option v-for="item in profissaos" v-bind:value="item.id">{{item.nome}}</option>
                </select>
              </p>
            </div>
          </div>
        </div>

        <div class="column text-center">
          <span class="button is-info is-small btn-file">
            Seelecionar Foto <input type="file" id='foto-open' @change="onFileChange">
          </span>
          <img :src="paciente.foto_url" alt="Foto do Paciente" style="max-height: 115px; max-width: 130px; text-align: center;" />
        </div>
      </div>

      <div class=" columns is-gapless">
        <div class="column">
          <label class="label">CEP</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.cep" v-bind="cepMask" autocomplete="off" maxlength="9">
          </p>
        </div>
        <div class="column is-5">
          <label class="label">Logradouro</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.endereco" autocomplete="off" maxlength="255">
          </p>
        </div>
        <div class="column">
          <label class="label">Número</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.numero" id="inputNumero" autocomplete="off" maxlength="10">
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Complemento</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.complemento" autocomplete="off" maxlength="45">
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Bairro</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.bairro" autocomplete="off" maxlength="45">
          </p>
        </div>
      </div>

      <div class=" columns is-gapless">
        <div class="column is-3">
          <label class="label">Cidade</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.cidade" autocomplete="off" maxlength="45">
          </p>
        </div>
        <div class="column">
          <label class="label">UF</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.estado" autocomplete="off" maxlength="2">
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Naturalidade</label>
          <p class="control">
            <input class="input" type="text" v-model="paciente.naturalidade" autocomplete="off" maxlength="45">
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Nacionalidade</label>
          <p class="control">
            <select class="select" style="width: 100%;" v-model="paciente.nacionalidade_id" autocomplete="off">
              <option>Selecione uma Nacionalidade</option>
              <option v-for="item in nacionalidades" v-bind:value="item.id">{{item.nome_pais}}</option>
            </select>
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Religião</label>
          <p class="control">
            <select class="select" style="width: 100%;" v-model="paciente.religiao_id" autocomplete="off">
              <option>Selecione uma Religião</option>
              <option v-for="item in religiaos" v-bind:value="item.id">{{item.nome}}</option>
            </select>
          </p>
        </div>
        <div class="column is-2">
          <label class="label">Cor (IBGE)</label>
          <p class="control">
            <select class="select" style="width: 100%;" v-model="paciente.cor_id" autocomplete="off">
              <option>Selecione uma Cor</option>
              <option v-for="item in cors" v-bind:value="item.id">{{item.nome}}</option>
            </select>
          </p>
        </div>
      </div>





      <nav class="panel">
        <div class="panel-heading">
          Dados auxiliares
        </div>
        <div class="tabs">
          <ul>
            <li v-for="(item, k) in tabs" :class="item.class" v-on:click="tabActive(k)"><a>{{item.label}}</a></li>
          </ul>
        </div>

        <div class="container">

          <div v-if="tabs.profissional.active">
            <h3 class="title text-center">Possui acompanhamento de profissional da saúde</h3>
            <input type="hidden" id="pacientes_acompanhamentos_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Especialidade</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_acompanhamentos_especialidade_id" autocomplete="off">
                    <option>Selecione uma Profissão</option>
                    <option v-for="item in especialidades" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>
              <div class="column is-6">
                <label class="label">Nome profissional/Entidade</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_acompanhamentos_medico" autocomplete="off">
                </p>
              </div>
              <div class="column is-2">
                <label class="label">Telefone</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_acompanhamentos_telefone" onkeyup="mascaraTel(this, '(##) #####-####')" maxlength="15"
                  autocomplete="off">
                </p>
              </div>
              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_acompanhamentos')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Especialidade</th>
                  <th>Nome profissional/Entidade</th>
                  <th>Telefone</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_acompanhamentos">
                  <td>{{item.especialidade.nome}}</td>
                  <td>{{item.medico}}</td>
                  <td>{{item.telefone | telefone}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_acompanhamentos')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_acompanhamentos')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <div v-if="tabs.emergencia.active">
            <h3 class="title text-center">Em caso de emergência avisar</h3>
            <input type="hidden" id="pacientes_emergencias_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Parentesco</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_emergencias_parentesco_id" autocomplete="off">
                    <option>Selecione uma Profissão</option>
                    <option v-for="item in parentescos" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>
              <div class="column is-6">
                <label class="label">Nome</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_emergencias_nome" autocomplete="off">
                </p>
              </div>
              <div class="column is-2">
                <label class="label">Telefone</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_emergencias_telefone" onkeyup="mascaraTel(this, '(##) #####-####')" maxlength="15"
                  autocomplete="off">
                </p>
              </div>
              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_emergencias')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Parentesco</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_emergencias">
                  <td>{{item.parentesco.nome}}</td>
                  <td>{{item.nome}}</td>
                  <td>{{item.telefone | telefone}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_emergencias')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_emergencias')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabs.programacao.active">
            <h3 class="title text-center">Programação de retorno do Paciente</h3>
            <input type="hidden" id="pacientes_programacoes_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Usuário</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_programacoes_usuario_id" autocomplete="off">
                    <option>Selecione um Usuário</option>
                    <option v-for="item in usuarios" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>
              <div class="column is-5">
                <label class="label">Motivo</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_programacoes_motivo" autocomplete="off">
                </p>
              </div>
              <div class="column">
                <label class="label">Data</label>
                <p class="control">
                  <input class="input" type="date" id="pacientes_programacoes_data" autocomplete="off">
                </p>
              </div>
              <div class="column">
                <label class="label">Hora</label>
                <p class="control">
                  <input class="input" type="time" id="pacientes_programacoes_hora" step="1" autocomplete="off">
                </p>
              </div>
              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_programacoes')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Motivo</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_programacoes">
                  <td>{{item.usuario.nome}}</td>
                  <td>{{item.motivo}}</td>
                  <td>{{item.data | data}}</td>
                  <td>{{item.hora | hora}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_programacoes')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_programacoes')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabs.servicos.active">
            <h3 class="title text-center">Tipo de serviço procurado para atendimento</h3>
            <input type="hidden" id="pacientes_servicos_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-11">
                <label class="label">Serviço</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_servicos_servicos_clinica_id" autocomplete="off">
                    <option>Selecione um Serviço</option>
                    <option v-for="item in servicosClinicas" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>
              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_servicos')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_servicos">
                  <td>{{item.servicos_clinica.nome}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_servicos')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_servicos')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabs.contato.active">
            <h3 class="title text-center">Tipos de Contatos</h3>
            <input type="hidden" id="contatos_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Tipo</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="contatos_contatos_tipo_id" autocomplete="off" @change="changeItem($event)">
                    <option>Selecione um Tipo de Contato</option>
                    <option v-for="item in contatosTipos" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>

              <div class="column is-8">
                <label class="label">Descreva o contato</label>
                <p class="control">
                  <input class="input" maxlength="255" type="text" id="contatos_valor" autocomplete="off">
                </p>
              </div>
              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('contatos')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição do Contato</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.contatos">
                  <td>{{item.contatos_tipo.nome}}</td>
                  <td>{{item.valor}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'contatos')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'contatos')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div v-if="tabs.como.active">
            <h3 class="title text-center">Nos conheceu como</h3>
            <input type="hidden" id="pacientes_soube_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Como</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_soube_como" autocomplete="off">
                </p>
              </div>

              <div class="column is-3">
                <label class="label">Especialidade</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_soube_especialidade_id" autocomplete="off">
                    <option>Selecione um Serviço</option>
                    <option v-for="item in especialidades" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>

              </div>

              <div class="column is-3">
                <label class="label">Nome</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_soube_nome" autocomplete="off">
                </p>
              </div>
              <div class="column is-2">
                <label class="label">Telefone</label>
                <p class="control">
                  <input class="input" type="tel" id="pacientes_soube_telefone" onkeyup="mascaraTel(this, '(##) #####-####')" maxlength="15"
                  autocomplete="off">
                </p>
              </div>


              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_soube')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Motivo</th>
                  <th>Especialidade</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_soube">
                  <td>{{item.como}}</td>
                  <td>{{item.especialidade.nome}}</td>
                  <td>{{item.nome}}</td>
                  <td>{{item.telefone | telefone}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_soube')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_soube')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div v-if="tabs.convenio.active">
            <h3 class="title text-center">Convênio</h3>
            <input type="hidden" id="pacientes_convenios_id" autocomplete="off">
            <div class=" columns is-gapless">

              <div class="column is-3">
                <label class="label">Convênio</label>
                <p class="control">
                  <select class="select" style="width: 100%;" id="pacientes_convenios_convenio_id" autocomplete="off">
                    <option>Selecione um Serviço</option>
                    <option v-for="item in convenios" v-bind:value="item.id">{{item.nome}}</option>
                  </select>
                </p>
              </div>

              <div class="column is-3">
                <label class="label">Plano</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_convenios_plano" autocomplete="off">
                </p>
              </div>

              <div class="column is-3">
                <label class="label">Número Matricula</label>
                <p class="control">
                  <input class="input" type="text" id="pacientes_convenios_matricula" maxlength="45" autocomplete="off">
                </p>
              </div>
              <div class="column is-2">
                <label class="label">Titular do Plano</label>
                <p class="control">
                  <input class="input" type="tel" id="pacientes_convenios_titular" maxlength="255" autocomplete="off">
                </p>
              </div>


              <div class="column text-center">
                <label class="label">&nbsp;</label>
                <button type="button" v-on:click="add('pacientes_convenios')" class="button"><i class="fa fa-plus-circle"></i></button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Convênio</th>
                  <th>Plano</th>
                  <th>Número Matricula</th>
                  <th>Titular do Plano</th>
                  <th style="text-align: center;">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, k) in paciente.pacientes_convenios">
                  <td>{{item.convenio.nome}}</td>
                  <td>{{item.plano}}</td>
                  <td>{{item.matricula}}</td>
                  <td>{{item.titular}}</td>
                  <td class="text-center">
                    <i v-on:click="clone(k, 'pacientes_convenios')" class="fa fa-pencil"></i>
                    <i v-on:click="remove(k, 'pacientes_convenios')" class="fa fa-eraser"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div v-if="tabs.midias.active">
            <h3 class="title text-center">Midias</h3>
            <div class=" columns is-gapless">
              <p v-for="(item, k) in midias" class="control column">
                <label class="checkbox">
                  <input type="checkbox" :value="item.id" v-model="paciente.midias">
                  {{item.nome}}
                  {{item.checked}}
                </label>
              </p>
            </div>
          </div>



        </div>
      </nav>
    </form>

  </div>
</template>

<script>
import Config from '../../config';
import FormText from '../../form/text.vue';
import Datepicker from '../../form/datepicker.vue';
import Mascaras from '../../util/mascara';

export default {
  components:{FormText, Datepicker},
  data () {
    return {
      url:'pacientes',
      isCarregando: true,
      paciente: {
        id: null,
        nome: null,
        status: null,
        cep: null,
        endereco: null,
        numero: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
        cpf: null,
        rg: null,
        data_nascimento: null,
        sexo_id: null,
        foto: null,
        cartao_sus:null,
        estados_civil_id:null,
        escolaridade_id: null,
        profissao_id: null,
        naturalidade: null,
        nacionalidade_id: null,
        religiao_id: null,
        cor_id: null,
        centro_custo: null,
        created: null,
        modified: null,
        cpf_mask: null,
        status_mask: null,
        foto_url: null,
        contatos: [],
        midias: [],
      },
      pacientes_convenios: [],
      pacientes_soube: [],
      pacientes_servicos: [],
      pacientes_programacoes: [],
      pacientes_emergencias: [],
      pacientes_acompanhamentos: [],
      midias: [],
      convenios: [],
      contatosTipos: [],
      servicosClinicas: [],
      usuarios: [],
      parentescos: [],
      especialidades: [],
      sexos: [],
      estadosCivils: [],
      escolaridades: [],
      profissaos: [],
      nacionalidades: [],
      religiaos: [],
      cors: [],
      tabs :{
        profissional: {label: 'Profissional', active: true, class: 'is-active'},
        emergencia: {label: 'Emergência', active: false, class: ''},
        programacao: {label: 'Programação', active: false, class: ''},
        servicos: {label: 'Serviços', active: false, class: ''},
        contato: {label: 'Contatos', active: false, class: ''},
        como: {label: 'Como nos conheceu', active: false, class: ''},
        convenio: {label: 'Convênio', active: false, class: ''},
        midias: {label: 'Midia', active: false, class: ''}
      }
    }
  },
  computed: {
    cpfMask: function () {
      this.paciente.cpf = Mascaras.processaMascara(this.paciente.cpf, '###.###.###-##', 'int');
      return;
    },
    cepMask: function () {
      this.paciente.cep = Mascaras.processaMascara(this.paciente.cep, '#####-###', 'int');
      this.paciente = Mascaras.cep(this.paciente, this);
      return;
    }
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
      return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.paciente.foto_url = e.target.result;
        vm.paciente.foto = vm.paciente.foto_url;
      };
      reader.readAsDataURL(file);
    },
    load ()  {
      this.isCarregando = true;
      this.$http.get(Config.url + this.url+'/edit/'+this.$route.params.id, {}).then(function (resp) {
        this.retorno(resp);
      }, function (resp) {
        this.retorno(resp);
      });
    },
    retorno: function (resp) {
      if (resp.status === 200) {
        this.paciente = resp.body.result.paciente
        this.pacientes_convenios = resp.body.result.pacientes_convenios
        this.pacientes_soube = resp.body.result.pacientes_soube
        this.pacientes_servicos = resp.body.result.pacientes_servicos
        this.pacientes_programacoes = resp.body.result.pacientes_programacoes
        this.pacientes_emergencias = resp.body.result.pacientes_emergencias
        this.pacientes_acompanhamentos = resp.body.result.pacientes_acompanhamentos
        this.midias = resp.body.result.midias
        this.convenios = resp.body.result.convenios
        this.contatosTipos = resp.body.result.contatosTipos
        this.servicosClinicas = resp.body.result.servicosClinicas
        this.usuarios = resp.body.result.usuarios
        this.parentescos = resp.body.result.parentescos
        this.especialidades = resp.body.result.especialidades
        this.sexos = resp.body.result.sexos
        this.estadosCivils = resp.body.result.estadosCivils
        this.escolaridades = resp.body.result.escolaridades
        this.profissaos = resp.body.result.profissaos
        this.nacionalidades = resp.body.result.nacionalidades
        this.religiaos = resp.body.result.religiaos
        this.cors = resp.body.result.cors
      }
      console.log(this.paciente);
      this.isCarregando = false;
    },
    tabActive: function (key) {
            for (var i in this.tabs) {
                this.tabs[i].active = false;
                this.tabs[i].class = '';
            }
            this.tabs[key].active = true;
            this.tabs[key].class = 'is-active';
        },
  },
  mounted () {
    console.log(this.$route.params.id);
    this.load ();
  }
}
</script>
