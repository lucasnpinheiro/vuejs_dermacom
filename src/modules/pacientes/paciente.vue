<template>
  <div style="width:100%;">
    <div style="background: #efefef;">
      <div class="columns">
        <div class="column is-6">
          <h1 class="title">Pacientes</h1>
        </div>
        <div class="column is-6 text-right">
          <button v-show="isCarregando" class="button is-primary is-loading is-small">
            <i aria-hidden="true" class="fa fa-spinner"></i>
          </button>
          <button class="button is-warning is-small" :disabled="isPrevent" v-on:click.prevent="loadPage(paging.page-1)"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
          <button class="button is-warning is-small" :disabled="isNext" v-on:click.prevent="loadPage(paging.page+1)"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
          <button  v-on:click="novo()" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-plus-circle"></i>
          </button>
          <button :disabled="disabledBtnDelete" v-on:click="editar()" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-pencil-square"></i>
          </button>
          <button :disabled="true" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-floppy-o"></i>
          </button>
          <button :disabled="disabledBtnEdit" v-on:click="excluir()" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-times-circle"></i>
          </button>
          <button v-on:click="clean()" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-list"></i>
          </button>
          <button :disabled="true" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-print"></i>
          </button>
        </div>
      </div>
    </div>
    <div style="background: #ffffff;">
      <div class="columns">
        <div class="column is-12" style="margin-top: 5px;">
          <div class="columns">
            <div class="column">
              <input placeholder="Informe o termo a pesquisar" class="input" type="text" v-model="paging.q">
            </div>
            <div class="column is-2">
              <button class="button is-info"  @click="search()">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
              <button class="button is-info"  @click="clean()">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button class="button is-success is-small" v-on:click="preConfig()">
                <i class="fa fa-cogs" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div style="overflow: auto;">
            <table class="table is-striped is-narrow">
              <thead>
                <tr>
                  <th v-for="c in colums" v-if="c.ative" v-on:click.prevent="sort(c.coluna)" :class="c.css" style="position: relative;"><i :class="sortCss(c.coluna)" aria-hidden="true" style="font-size: 13px;margin-top: 0px;position: absolute; margin-left: -7px;"></i>&nbsp;{{c.label}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, coluna) in list" v-on:click.prevent="linhaSelecionada(coluna)" v-on:dblclick.prevent="editar()" :class="item.linha_selecionada">
                  <td v-for="c in colums" v-if="c.ative">{{item[c.chave]}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <modal :active="modalActive" :msg="modalMsg"></modal>
    <div v-show="modalConfigActive" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Configurações!</p>
        </header>
        <section class="modal-card-body">
          <h1>Quantide de registro exibido na pagina por paginação.</h1>

          <div class="columns">
            <div class="column">
              <label class="label">Limit de registro</label>
              <p class="control">
                <span class="select">
                  <select v-model="configPaging.limite">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">

              <label class="label">Ordernar por</label>
              <p class="control">
                <span class="select">
                  <select v-model="configPaging.coluna">
                    <option v-for="c in colums" :value="c.coluna">{{ c.label }}</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="column">
              <label class="label">Tipo de ordenação</label>
              <p class="control">
                <span class="select">
                  <select v-model="configPaging.direcao">
                    <option value="asc">Crescente</option>
                    <option value="desc">Decresente</option>
                  </select>
                </span>
              </p>
            </div>

          </div>
          <h1>Colunas</h1>
          <p v-for="c in colums" class="control" style="display: inline-block; width: 33%;">
            <input type="checkbox" value="1" v-model="c.ative">
            <label class="checkbox" style="line-height: 13px;">
              <span>{{ c.label }}</span>
            </label>
          </p>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary ok" v-on:click="salvarColunas()">Salvar</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

import Config from '../../config.js'
import Modal from '../../util/modal.vue'
import Inflector from 'inflector-js'

export default {
  components:{Modal},
  data () {
    return {
      modalActive: false,
      modalConfigActive: false,
      modalMsg: '',
      url: 'pacientes',
      isPrevent : true,
      isNext: true,
      colums: [],
      paging: {
        count: 0,
        page: 1,
        pageCount: 0,
        sort: '',
        q: '',
        direction: '',
        limit: 20
      },
      configPaging: {
        coluna: '',
        direcao: '',
        limite: 20
      },
      disabledBtnDelete: true,
      disabledBtnEdit: true,
      isCarregando: true,
      list: []
    }
  },
  methods: {
    preLoad ()  {
      this.load();
    },
    load ()  {
      this.isCarregando = true;
      this.$http.get(Config.url + this.url+'/index-load', {params: this.paging}).then(function (resp) {
        this.retorno(resp);
      }, function (resp) {
        this.retorno(resp);
      });
    },
    retorno: function (resp) {
      this.isNext = true;
      this.isPrevent = true;
      this.disabledBtnDelete = true;
      this.disabledBtnEdit = true;
      if (resp.status === 200) {
        this.list = [];
        for (let i in resp.body.result) {
          resp.body.result[i].linha_selecionada = '';
          this.list.push(resp.body.result[i]);
        }
        this.paging.page = resp.body.paging.page;
        this.paging.pageCount = resp.body.paging.pageCount;
        this.paging.count = resp.body.paging.count;
        if(this.paging.page < this.paging.pageCount){
          this.isNext = false;
        }
        if(this.paging.page > 1){
          this.isPrevent = false;
        }
      }
      this.isCarregando = false;
    },
    loadPage: function (page) {
      if (page <= this.paging.pageCount && page >= 1) {
        if (page != this.paging.page) {
          this.paging.page = page;
          this.preLoad();
        }
      }
    },
    search: function (page) {
      this.paging.page = 1;
      this.preLoad();
    },
    clean ()  {
      this.paging.q = null;
      this.paging.page = 1;
      this.preLoad();
    },
    activePage: function (page) {
      if (this.paging.page == page) {
        return 'is-primary';
      } else {
        return '';
      }
    },
    sort: function (coluna) {
      if (this.paging.sort === coluna) {
        this.paging.direction = this.paging.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.paging.direction = 'asc';
      }
      this.paging.sort = coluna;
      this.sortCss(coluna);
      this.preLoad();
    },
    sortCss: function (coluna) {
      if (this.paging.sort === coluna) {
        return 'fa fa-sort-' + this.paging.direction;
      } else {
        return '';
      }
    },
    linhaSelecionada: function (coluna) {
      for (let i in this.list) {
        this.list[i].linha_selecionada = '';
      }

      if(this.list[coluna].linha_selecionada === ''){
        this.disabledBtnDelete = false;
        this.disabledBtnEdit = false;
        this.list[coluna].linha_selecionada = 'linha-selecionada';
      }
    },
    gravar ()  {
      this.openModal('Função indisponivel nesta tela.');
    },
    editar ()  {
      this.closeModal();
      let linha = null;
      for (let i in this.list) {
        if (this.list[i].linha_selecionada !== '') {
          linha = this.list[i].id;
        }
      }

      if (linha > 0) {
        this.$router.push({name: 'PacienteEdit', params: { id: linha }});
      } else {
        this.openModal('Selecione um registro para ser editado.');
      }
    },
    excluir ()  {
      this.closeModal();
      let obj = this;

      let linha = null;
      for (let i in obj.list) {
        if (obj.list[i].linha_selecionada !== '') {
          linha = obj.list[i].id;
        }
      }
      if (linha > 0) {

        extra.modalConfirme({msg: 'Deseja realmente excluir este registro?'}, function (a) {
          if (a === true) {
            obj.$http.get(Config.url + this.url + '/delete/' + linha).then(function (resp) {
              extra.modal({msg: 'Registro excluido com sucesso.'}, function () {
                window.location.reload();
              });
            }, function (resp) {
              extra.modal({msg: 'Não foi possivel excluir o registro'}, function () {});
            });
          }
        });

      } else {
        this.openModal('Não foi selecionado nenhum registro pra exclusão.');
      }

    },
    novo ()  {
      this.$router.push({name: 'PacienteEdit', params: { id: 0 }});
    },
    imprimir ()  {
      extra.modal({msg: 'Funcionalidade não implementada.'}, function () {});
    },
    preConfig () {
      console.log('aaaa')
      this.modalConfigActive = true;
    },
    openModal (msg){
      this.closeModal ();
      this.modalActive = true;
      this.modalMsg = 'Não foi selecionado nenhum registro pra exclusão.';
    },
    closeModal (){
      this.modalActive = false;
      this.modalMsg = '';
    },
    getColunas () {
      this.colums = [];
      this.$http.get(Config.url + this.url+'/get-colluns-tabela/1/'+this.url, {}).then(function (resp) {
        if (resp.status === 200) {
          for (let i in resp.body.result.colunas) {
            this.colums.push({
              label: resp.body.result.colunas[i]['label'],
              coluna: resp.body.result.colunas[i]['coluna'],
              chave: resp.body.result.colunas[i]['chave'],
              ative: resp.body.result.colunas[i]['ative'] > 0 ? true : false,
              css: resp.body.result.colunas[i]['css'],
              linha_selecionada : ''
            });
          }

          this.configPaging.coluna = resp.body.result.config.coluna;
          this.configPaging.direcao = resp.body.result.config.direcao;
          this.configPaging.limite = resp.body.result.config.limite;

          this.paging.sort = resp.body.result.config.coluna;
          this.paging.direction = resp.body.result.config.direcao;
          this.paging.limit = resp.body.result.config.limite;

          this.sortCss(this.paging.sort);

          this.load();
        } else {
          this.openModal('Não há configurações de colunas para este usuário.');
        }
      }, function (resp) {
        this.openModal('Não há configurações de colunas para este usuário.');
      });
    },
    salvarColunas () {
      this.$http.post(Config.url + this.url+'/set-colluns-tabela/1/'+this.url, {colunas:this.colums, paginacao: this.configPaging}).then(function (resp) {
        this.getColunas ();
        this.modalConfigActive = false;
      }, function (resp) {
        this.getColunas ();
        this.modalConfigActive = false;
      });
    }
  },
  mounted() {
    this.getColunas();
  }
}
</script>
