import moment from 'moment';

module.exports =(function (value) {
  let d = value;
  if (!!d) {
    d = d.replace(/\D/g, '');
    if (d.length > 7) {
      let data = moment(value).format('DD/MM/YYYY');
      d = data.substr(0, 2);
      d += '/' + data.substr(2, 2);
      d += '/' + data.substr(4, 4);
      let a = moment(value);
      let b = moment(new Date());
      let dfa = b.diff(a, 'years');
      let dfm = a.format('MM');
      let ma = moment().format('MM');
      let mad = parseInt(ma) - parseInt(dfm);
      mad = mad < 0 ? mad * -1 : mad;

      let dfd = a.format('DD');
      let md = moment().format('DD');
      let mdd = parseInt(md) - parseInt(dfd);
      mdd = mdd < 0 ? mdd * -1 : mdd;

      d = dfa + ' A, ' + mad + ' M e ' + mdd + ' D';
    }
  }
  return d;
})
