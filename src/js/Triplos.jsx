import { Expreciones } from "../data/Expreciones";

let dataTableTriplos = [{
      operador: '---',
      datoObj: '---',
      DatosFuente: '---',
}];

var DatoObj = '';
var DatoObjAnt = '';
var Operador = '';
var DatoFuente = '';
var obj = 0;
var band = false;

export const Triplos = (prog) => {

      dataTableTriplos = [{
            operador: '---',
            datoObj: '---',
            DatosFuente: '---',
      }]
      const Prog = prog.split("\n");
      Prog.forEach(data => {
            const arryLine = data.split(" ");
            // si existe una operacion aritmetica en la linea de codigo se ejecutara este if
            if (validarOperciones(arryLine)) {
                  expAritmeticas(arryLine);
            }
      })




      return dataTableTriplos;
}

const validarOperciones = (arryLine) => {
      // Validamos si existe una operacion aritmetica en la linea de codigo (=, +, -, *, /)
      let asig = Expreciones.find(x => x.id === 4);
      let ban = false;
      arryLine.forEach(lexema => {
            if (lexema !== "") {
                  // si existe una operacion aritmetica entrara en este if
                  if (lexema.match(asig.regExp) != null) {
                        ban = true;
                        return ban;
                  }
            }
      })
      // retorna true si existe una operacion aritmetica y false si no existe
      return ban;
}

const expAritmeticas = (tripo) => {
      let ban = 0;
      let nivel = false;
      let tt = false;
      const expreA = /(^\*$)|(^%$)|(^\/$)/g;
      const expreA1 = /(^\+$)|(^-$)/g;

      tripo = tripo.filter(x => x !== '');
      // console.log('===>', tripo);

      for (let i = 0; i < tripo.length; i++) {
            // si tripo[i] === (/ | % | *)
            if (tripo[i].match(expreA) !== null) {
                  nivel = true;
                  if (tripo[i - 2].match(expreA) !== null) {
                        DatoObj = 'T1';
                        Operador = tripo[i];
                        DatoFuente = tripo[i + 1];
                        dataTableTriplos.push({
                              operador: Operador,
                              datoObj: DatoObj,
                              DatosFuente: DatoFuente
                        });
                  } else {
                        // si dos posiciones atras es === ( + | - )
                        if (tripo[i - 2].match(expreA1) !== null) {
                              if (ban === 1) {
                                    Operador = '=';
                                    DatoObj = 'T2';
                                    DatoFuente = tripo[i - 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                                    DatoObj = 'T1';
                              } else {
                                    Operador = '=';
                                    DatoObj = 'T1';
                                    DatoFuente = tripo[i - 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                                    ban = 1;
                              }

                        } else {
                              Operador = '=';
                              DatoObj = 'T1';
                              DatoFuente = tripo[i - 1];
                              dataTableTriplos.push({
                                    operador: Operador,
                                    datoObj: DatoObj,
                                    DatosFuente: DatoFuente
                              });
                              Operador = tripo[i];
                              DatoFuente = tripo[i + 1];
                              dataTableTriplos.push({
                                    operador: Operador,
                                    datoObj: DatoObj,
                                    DatosFuente: DatoFuente
                              });
                              ban = 1;
                        }
                  }
            }
      }

      if (nivel === false) {
            obj = 1;
            DatoObj = 'T1'
      } else {
            obj = 2;
            DatoObjAnt = DatoObj;
            DatoObj = 'T2';
      }

      // --------------------------
      var nivel2 = false;
      var long = tripo.length;
      for (let i = 0; i < tripo.length; i++) {
            // -----
            if (tripo[i].match(expreA1) !== null) {
                  nivel2 = true;

                  if (tripo[i - 2].match(expreA1) !== null) {
                        if (tripo[i + 2].match(expreA) !== null) {
                              Operador = tripo[i];
                              dataTableTriplos.push({
                                    operador: Operador,
                                    datoObj: DatoObj,
                                    DatosFuente: DatoObjAnt
                              });
                        } else {
                              Operador = tripo[i];
                              DatoObj = 'T1';
                              DatoFuente = tripo[i + 1];

                              dataTableTriplos.push({
                                    operador: Operador,
                                    datoObj: DatoObj,
                                    DatosFuente: DatoFuente
                              });
                        }
                  } else {
                        // ---
                        if (long !== i) {
                              if (tripo[i + 2].match(expreA) !== null) {
                                    if (tripo[i - 2].match(expreA) !== null) {
                                          Operador = tripo[i];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObjAnt,
                                                DatosFuente: DatoObj
                                          });
                                          tt = true;
                                    } else {
                                          if (band === true) {
                                                obj++;
                                                DatoObjAnt = DatoObj;
                                                DatoObj = 'T' + obj;
                                                tt = true;
                                          }
                                          Operador = '=';
                                          DatoFuente = tripo[i - 1];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObj,
                                                DatosFuente: DatoFuente,
                                          })
                                          Operador = tripo[i];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObjAnt,
                                                DatosFuente: DatoObj,
                                          })
                                          band = true;

                                    }
                              } else {
                                    if (tripo[i - 2].match(expreA) !== null) {
                                          if (band === true) {
                                                obj++;
                                                DatoObjAnt = DatoObj;
                                                DatoObj = 'T' + obj;
                                                tt = true;
                                          }
                                          Operador = '=';
                                          DatoFuente = tripo[i + 1];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObj,
                                                DatosFuente: DatoFuente,
                                          })
                                          Operador = tripo[i];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObj,
                                                DatosFuente: DatoFuente
                                          });
                                          band = true;
                                    } else {
                                          Operador = '=';
                                          DatoFuente = tripo[i - 1];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObj,
                                                DatosFuente: DatoFuente
                                          });

                                          Operador = tripo[i];
                                          DatoFuente = tripo[i + 1];
                                          dataTableTriplos.push({
                                                operador: Operador,
                                                datoObj: DatoObj,
                                                DatosFuente: DatoFuente
                                          });
                                    }
                              }
                        } else {
                              if (tripo[i - 2].match(expreA) !== null) {
                                    if (band === true) {
                                          obj++;
                                          DatoObjAnt = DatoObj;
                                          DatoObj = 'T' + obj;
                                          tt = true;
                                    }
                                    Operador = '=';
                                    DatoFuente = tripo[i + 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente,
                                    })
                                    Operador = tripo[i];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                                    band = true;
                              } else {
                                    Operador = '=';
                                    DatoFuente = tripo[i - 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });

                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    dataTableTriplos.push({
                                          operador: Operador,
                                          datoObj: DatoObj,
                                          DatosFuente: DatoFuente
                                    });
                              }
                        }
                  }
            }
      }


      if (nivel2 === false) {
            DatoObj = 'T1';
      }
      for (var w = 0; w < tripo.length; w++) {
            if ((tripo[w] === '=') && (tripo[w + 2].match(expreA1) || tripo[w + 2].match(expreA))) {
                  if (tt === false) {
                        DatoFuente = DatoObj;
                  } else {
                        DatoFuente = DatoObjAnt;
                  }
                  DatoObj = tripo[w - 1];
                  Operador = tripo[w];
                  dataTableTriplos.push({
                        operador: Operador,
                        datoObj: DatoObj,
                        DatosFuente: DatoFuente,
                  })
                  band = false;
            } else {
                  if (tripo[w] === '=') {
                        DatoObj = 'T1';
                        Operador = tripo[w];
                        DatoFuente = tripo[w + 1];
                        dataTableTriplos.push({
                              operador: tripo[w],
                              datoObj: 'T1',
                              DatosFuente: tripo[w + 1],
                        })
                        DatoFuente = DatoObj;
                        DatoObj = tripo[w - 1]
                        dataTableTriplos.push({
                              operador: tripo[w],
                              datoObj: tripo[w + 1],
                              DatosFuente: DatoObj,
                        })
                  }
            }
      }

}