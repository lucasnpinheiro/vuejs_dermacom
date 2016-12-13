import Config from '../config';

export default {
  processaMascara (input, mask, remove) {
    if (!!input) {
      if (remove === 'int') {
        input = input.replace(/\D/g, '');
      }
      let maskared = '';
      var k = 0;
      for (var i = 0; i <= mask.length - 1; i++) {
        if (mask[i] === '#') {
          if (input[k] !== undefined)
          maskared += input[k++];
        } else {
          if (mask[i] !== undefined)
          maskared += mask[i];
        }
      }
      return maskared;
    } else {
      return '';
    }
  },
  mascara (t, mask) {
    t.value = this.processaMascara(t.value, mask);
  },
  mascaraTel (t, mask) {
    t.value = t.value.replace(/\D/g, '');
    if (t.value.length > 0) {
      this.mascara(t, mask);
    } else {
      t.value = '';
    }
  },
  cep (val, obj) {
    let d = val.cep;
    if (!!val) {
      d = d.replace(/\D/g, '');
      if (d.length > 7) {
        obj.$http.post(Config.url + 'utilits/cep/' + d).then(function (resp) {
          resp = resp.body.result;
          if (resp.status === 'OK') {
            val.bairro = resp.Cep.bairro;
            val.cidade = resp.Cep.cidade;
            val.estado = resp.Cep.uf;
            val.endereco = resp.Cep.logradouro;
            val.nacionalidade_id = 1;
            document.getElementById("inputNumero").focus();
          }
        }, function (resp) {});

      }
    }
    return val;
  }
}
