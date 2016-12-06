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
          <button  v-on:click="novo" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-plus-circle"></i>
          </button>
          <button  v-on:click="editar" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-pencil-square"></i>
          </button>
          <button :disabled="true" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-floppy-o"></i>
          </button>
          <button :disabled="true" class="button is-info is-small">
            <i aria-hidden="true" class="fa fa-times-circle"></i>
          </button>
          <button :disabled="true" class="button is-info is-small">
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
            <div class="column is-5">
              <input placeholder="Informe o termo a pesquisar" class="input" type="text" v-model="paging.q">
            </div>
            <div class="column is-3">
              <button class="button is-info"  @click="search()">
                <i class="fa fa-search" aria-hidden="true"></i>  Pesquisar
              </button>
              <button class="button is-info"  @click="clean()">
                <i class="fa fa-trash" aria-hidden="true"></i>  Limpar
              </button>
            </div>
            <div class="column">
              <div v-on:click.prevent="dropdown()" class="checkbox-dropdown" :class="isOpenDropdown">
                <i>Colunas</i>
                <ul class="checkbox-dropdown-list">
                  <li v-for="(c, index) in colums" v-on:click.prevent="dropdownUl(index)"  :class="c.css">
                    {{c.label}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="column">
              <div v-on:click.prevent="dropdownLimit()" class="checkbox-dropdown" :class="isOpenDropdownLimit">
                <i>Limite: {{paging.limit}}</i>
                <ul class="checkbox-dropdown-list">
                  <li v-on:click.prevent="dropdownUlLimit(10)">10</li>
                  <li v-on:click.prevent="dropdownUlLimit(20)">20</li>
                  <li v-on:click.prevent="dropdownUlLimit(30)">30</li>
                  <li v-on:click.prevent="dropdownUlLimit(50)">50</li>
                  <li v-on:click.prevent="dropdownUlLimit(75)">75</li>
                  <li v-on:click.prevent="dropdownUlLimit(100)">100</li>
                </ul>
              </div>
            </div>
          </div>
          <table class="table is-striped is-narrow">
            <thead>
              <tr>
                <th v-for="c in colums" v-if="c.ative" v-on:click.prevent="sort(c.key)" :class="c.css"><i :class="sortCss(c.key)" aria-hidden="true" style="font-size: 13px;margin-top: 4px;"></i>&nbsp;{{c.label}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in list" v-on:click.prevent="linhaSelecionada(key)" v-on:dblclick.prevent="editar()" :class="item.linha_selecionada">
                <td v-for="c in colums" v-if="c.ative">{{item[c.chave]}}</td>
              </tr>
            </tbody>
          </table>
          <nav v-if="isPagination" class="pagination">
            <a class="button" v-on:click.prevent="loadPage(paging.page-1)">Anterior</a>
            <a class="button" v-on:click.prevent="loadPage(paging.page+1)">Próximo</a>
            <ul style="list-style: none;">
              <li v-for="i in links">
                <a class="button" :class="[activePage(i.page), i.css]" v-on:click.prevent="loadPage(i.page)"> {{i.page}}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'pacientes/index-load',
      colums: [
        {
          label: 'ID',
          key: 'id',
          chave: 'id',
          ative: false,
          css: ''
        },
        {
          label: 'Nome',
          key: 'nome',
          chave: 'nome',
          ative: true,
          css: 'active is-6'
        },
        {
          label: 'CPF',
          key: 'cpf',
          chave: 'cpf_mask',
          ative: true,
          css: 'active'
        },
        {
          label: 'Cartão do SUS',
          key: 'cartao_sus',
          chave: 'cartao_sus',
          ative: false,
          css: ''
        },
        {
          label: 'Situação',
          key: 'status',
          chave: 'status_mask',
          ative: true,
          css: 'active'
        },
        {
          label: 'Cidade',
          key: 'cidade',
          chave: 'cidade',
          ative: true,
          css: 'active'
        },
        {
          label: 'Estado',
          key: 'estado',
          chave: 'estado',
          ative: true,
          css: 'active'
        }

      ],
      paging: {
        count: 0,
        page: 1,
        pageCount: 0,
        sort: '',
        q: '',
        direction: '',
        limit: 20
      },
      links: [],
      isPagination: false,
      isCarregando: true,
      isOpenDropdown: '',
      isOpenDropdownLimit: '',
      list: []
    }
  },
  mounted: function () {
    this.load();
  },
  methods: {
    preLoad: function () {
      this.load();
    },
    load: function () {
      this.isCarregando = true;
      this.$http.get('http://localhost/dermacom/' + this.url, {params: this.paging}).then(function (resp) {
        this.retorno(resp);
      }, function (resp) {
        this.retorno(resp);
      });
    },
    retorno: function (resp) {
      if (resp.status === 200) {
        this.list = [];
        for (let i in resp.body.result) {
          resp.body.result[i].linha_selecionada = '';
          this.list.push(resp.body.result[i]);
        }
        this.paging.page = resp.body.paging.page;
        this.paging.pageCount = resp.body.paging.pageCount;
        this.paging.count = resp.body.paging.count;
        this.gerarPagination();
      }
      this.isCarregando = false;
    },
    gerarPagination: function () {
      let t = Math.ceil(this.paging.count / this.paging.limit);
      if (t > 0) {
        let i = this.paging.page - 4;
        if (i < 1) {
          i = 1;
        }
        let f = this.paging.page + 4;
        if (f > t) {
          f = t;
        }
        this.links = [];
        for (i; i <= f; i++) {
          this.links.push({page: i, css: ''});
        }
      }

      this.isPagination = t > 0 ? true : false;
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
    clear: function () {
      paging.q = null;
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
    dropdown: function () {
      this.isOpenDropdown = this.isOpenDropdown === '' ? 'is-active' : '';
      return;
    },
    dropdownUl: function (index) {
      this.colums[index].ative = !this.colums[index].ative;
      this.colums[index].css = this.colums[index].css === '' ? 'active' : '';
    },
    dropdownLimit: function () {
      this.isOpenDropdownLimit = this.isOpenDropdownLimit === '' ? 'is-active' : '';
      return;
    },
    dropdownUlLimit: function (limit) {
      this.paging.page = 1;
      this.paging.limit = limit;
      this.preLoad();
    },
    sort: function (key) {
      if (this.paging.sort === key) {
        this.paging.direction = this.paging.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.paging.direction = 'asc';
      }
      this.paging.sort = key;
      this.sortCss(key);
      this.preLoad();
    },
    sortCss: function (key) {
      if (this.paging.sort === key) {
        return 'fa fa-sort-' + this.paging.direction;
      } else {
        return '';
      }
    },
    linhaSelecionada: function (key) {

      for (let i in this.list) {
        this.list[i].linha_selecionada = '';
      }

      this.list[key].linha_selecionada = 'linha-selecionada';
    },
    gravar: function () {
      extra.modal({msg: 'Função indisponivel nesta tela.'}, function () {});
    },
    editar: function () {
      let linha = null;
      for (let i in this.list) {
        if (this.list[i].linha_selecionada !== '') {
          linha = this.list[i].id;
        }
      }
      if (linha > 0) {
        //console.log(this.$route);
        this.$router.push({name: 'PacienteEdit', params: { id: linha }});
        //window.location.href = router.url + 'pacientes/edit/' + linha;
      } else {
        extra.modal({msg: 'Selecione um registro para ser editado.'}, function () {});
      }
    },
    excluir: function () {
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
            obj.$http.get(router.url + Inflector.dasherize(Inflector.underscore(router.params.controller)) + '/delete/' + linha).then(function (resp) {
              extra.modal({msg: 'Registro excluido com sucesso.'}, function () {
                window.location.reload();
              });
            }, function (resp) {
              extra.modal({msg: 'Não foi possivel excluir o registro'}, function () {});
            });
          }
        });

      } else {
        extra.modal({msg: 'Não foi selecionado nenhum registro pra exclusão.'}, function () {});
      }

    },
    novo: function () {
      window.location.href = router.url + Inflector.dasherize(Inflector.underscore(router.params.controller)) + '/add';
    },
    consultar: function () {
      window.location.href = router.url + Inflector.dasherize(Inflector.underscore(router.params.controller));
    },
    imprimir: function () {
      extra.modal({msg: 'Funcionalidade não implementada.'}, function () {});
    }
  }
}
</script>
