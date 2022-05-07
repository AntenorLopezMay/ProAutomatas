import { Expreciones } from "../data/Expreciones";

let dataTableTriplos = [{
      cont: 0,
      operador: '---',
      datoObj: '---',
      DatosFuente: '---',
}];

let DatoObj = '';
let DatoObjAnt = '';
let Operador = '';
let DatoFuente = '';
let obj = 0;
let band = false;
let contLi = 0;

let OpOr = false;
let OpAnd = false;
let banderaIf = false;
let inicioIf = 0;
let finIf = 0;
let ifElse = false;
export const Triplos = (prog) => {

      dataTableTriplos = [{
            cont: 0,
            operador: '---',
            datoObj: '---',
            DatosFuente: '---',
      }]
      const Prog = prog.split("\n");
      // validamos si el programa cuanta con un else debuele un boolean 
      ifElse = validarIfElse(Prog);
      console.log(ifElse);
      Prog.forEach(data => {
            const arryLine = data.split(" ");
            // si existe una operacion aritmetica en la linea de codigo se ejecutara este if
            if (validarOperciones(arryLine)) {
                  expAritmeticas(arryLine);
            } else {
                  if (!ifElse) {
                        if (validarIf(arryLine)) {
                              triploIfElse(arryLine)
                              banderaIf = true;
                        }
                  } else {
                        if (validarIf(arryLine)) {
                              triploIfElse(arryLine)
                              banderaIf = true;
                        } else {
                              if (validarElselinea(arryLine)) {
                                    AgragrTriplo('JUM', '', '');
                              }
                        }
                  }


            }
            for (let x = 0; x < arryLine.length; x++) {
                  if (banderaIf === true && finIf === 0) {
                        if (arryLine[x] === '}') {
                              finIf = contLi + 1;
                              agregarNoLi();
                              finIf = 0;
                        } else {
                              if (arryLine[x] === '{') {
                                    inicioIf = contLi + 1;

                              }
                        }
                  }
            }
      })



      console.table(dataTableTriplos);
      contLi = 0;
      return dataTableTriplos;
}

const validarElselinea = (arryLine) => {
      let expre = /(^else$)/g
      let ban = false;
      arryLine.forEach(lexema => {
            if (lexema !== "") {
                  // si existe un "if" entrara en este if
                  if (lexema.match(expre) != null) {
                        ban = true;
                        return ban;
                  }
            }
      })
      // retorna true si existe una operacion aritmetica y false si no existe
      return ban;
}
const validarIfElse = (prog) => {
      let expre = /^else$/g
      let resp = false;
      prog.forEach(data => {
            const arryLine = data.split(" ");
            arryLine.forEach(lexema => {
                  if (lexema.match(expre) !== null) {
                        resp = true;
                  }
            })
      })

      return resp;
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
const validarIf = (arryLine) => {
      let expre = /(^if$)/g
      let ban = false;
      arryLine.forEach(lexema => {
            if (lexema !== "") {
                  // si existe un "if" entrara en este if
                  if (lexema.match(expre) != null) {
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
                        AgragrTriplo(Operador, DatoObj, DatoFuente);
                  } else {
                        // si dos posiciones atras es === ( + | - )
                        if (tripo[i - 2].match(expreA1) !== null) {
                              if (ban === 1) {
                                    Operador = '=';
                                    DatoObj = 'T2';
                                    DatoFuente = tripo[i - 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);
                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);
                                    DatoObj = 'T1';
                              } else {
                                    Operador = '=';
                                    DatoObj = 'T1';
                                    DatoFuente = tripo[i - 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);
                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);
                                    ban = 1;
                              }

                        } else {
                              Operador = '=';
                              DatoObj = 'T1';
                              DatoFuente = tripo[i - 1];
                              AgragrTriplo(Operador, DatoObj, DatoFuente);
                              Operador = tripo[i];
                              DatoFuente = tripo[i + 1];
                              AgragrTriplo(Operador, DatoObj, DatoFuente);
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
      let nivel2 = false;
      let long = tripo.length;
      for (let i = 0; i < tripo.length; i++) {
            // -----
            if (tripo[i].match(expreA1) !== null) {
                  nivel2 = true;

                  if (tripo[i - 2].match(expreA1) !== null) {
                        if (tripo[i + 2].match(expreA) !== null) {
                              Operador = tripo[i];
                              AgragrTriplo(Operador, DatoObj, DatoObjAnt);

                        } else {
                              Operador = tripo[i];
                              DatoObj = 'T1';
                              DatoFuente = tripo[i + 1];
                              AgragrTriplo(Operador, DatoObj, DatoFuente);
                        }
                  } else {
                        // ---
                        if (long !== i) {
                              if (tripo[i + 2].match(expreA) !== null) {
                                    if (tripo[i - 2].match(expreA) !== null) {
                                          Operador = tripo[i];
                                          AgragrTriplo(Operador, DatoObjAnt, DatoObj);
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
                                          AgragrTriplo(Operador, DatoObj, DatoFuente);
                                          Operador = tripo[i];
                                          AgragrTriplo(Operador, DatoObj, DatoObjAnt);

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
                                          AgragrTriplo(Operador, DatoObj, DatoFuente);
                                          Operador = tripo[i];
                                          AgragrTriplo(Operador, DatoObjAnt, DatoObj);

                                          band = true;
                                    } else {
                                          Operador = '=';
                                          DatoFuente = tripo[i - 1];
                                          AgragrTriplo(Operador, DatoObj, DatoFuente);

                                          Operador = tripo[i];
                                          DatoFuente = tripo[i + 1];
                                          AgragrTriplo(Operador, DatoObj, DatoFuente);
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
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);
                                    Operador = tripo[i];
                                    AgragrTriplo(Operador, DatoObjAnt, DatoObj);

                                    band = true;
                              } else {
                                    Operador = '=';
                                    DatoFuente = tripo[i - 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);

                                    Operador = tripo[i];
                                    DatoFuente = tripo[i + 1];
                                    AgragrTriplo(Operador, DatoObj, DatoFuente);

                              }
                        }
                  }
            }
      }


      if (nivel2 === false) {
            DatoObj = 'T1';
      }
      for (let w = 0; w < tripo.length; w++) {
            if ((tripo[w] === '=') && (tripo[w + 2].match(expreA1) || tripo[w + 2].match(expreA))) {
                  if (tt === false) {
                        DatoFuente = DatoObj;
                  } else {
                        DatoFuente = DatoObjAnt;
                  }
                  DatoObj = tripo[w - 1];
                  Operador = tripo[w];
                  AgragrTriplo(Operador, DatoObj, DatoFuente);

                  band = false;
            } else {
                  if (tripo[w] === '=') {
                        Operador = tripo[w];
                        DatoObj = 'T1';
                        DatoFuente = tripo[w + 1];
                        AgragrTriplo(Operador, DatoObj, DatoFuente);

                        DatoFuente = DatoObj;
                        DatoObj = tripo[w - 1]
                        AgragrTriplo(Operador, DatoObj, DatoFuente);
                  }
            }
      }
      band = false;
      tt = false;

}

const triploIfElse = (tripo) => {
      let relacionales = Expreciones.find(x => x.id === 3);
      tripo = tripo.filter(x => x !== '');
      for (let i = 0; i < tripo.length; i++) {
            if (tripo[i].match(relacionales.regExp) !== null) {
                  console.log('entro ===>', tripo[i]);
                  AgragrTriplo('=', 'T1', tripo[i - 1]);
                  AgragrTriplo(tripo[i], 'T1', tripo[i + 1]);
                  AgragrTriplo('', 'TR1', 'TRUE');
                  AgragrTriplo('', 'TR1', 'FALSE');
            } else {
                  if (tripo[i] === '||') {
                        OpOr = true;

                  } else {
                        if (tripo[i] === '&&') {
                              OpAnd = true;
                        }
                  }
            }
      }
}

const agregarNoLi = () => {
      for (let i = 0; i < dataTableTriplos.length; i++) {
            if (dataTableTriplos[i].operador === '') {

                  if (OpOr === true) {
                        if (dataTableTriplos[i].DatosFuente === 'TRUE') {
                              dataTableTriplos[i].operador = inicioIf;
                        } else {

                              if (ifElse) {
                                    if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                          let f = i + 1;
                                          if (inicioIf === f) {
                                                dataTableTriplos[i].operador = finIf + 1;
                                          } else {
                                                let s = i + 1;
                                                dataTableTriplos[i].operador = s;
                                          }
                                    }
                              } else {
                                    if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                          let f = i + 1;
                                          if (inicioIf === f) {
                                                dataTableTriplos[i].operador = finIf;
                                          } else {
                                                let s = i + 1;
                                                dataTableTriplos[i].operador = s;
                                          }
                                    }
                              }
                        }
                  } else {
                        if (OpAnd === true) {
                              if (dataTableTriplos[i].DatosFuente === 'TRUE') {
                                    let f = i + 2;
                                    dataTableTriplos[i].operador = f;
                              } else {
                                    if (ifElse) {
                                          if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                                dataTableTriplos[i].operador = finIf + 1;
                                          }
                                    } else {
                                          if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                                dataTableTriplos[i].operador = finIf;
                                          }
                                    }
                              }
                        } else {
                              if (OpAnd === false && OpOr === false) {
                                    if (dataTableTriplos[i].DatosFuente === 'TRUE') {
                                          dataTableTriplos[i].operador = inicioIf;
                                    } else {
                                          if (ifElse) {
                                                if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                                      dataTableTriplos[i].operador = finIf + 1;
                                                }
                                          } else {
                                                if (dataTableTriplos[i].DatosFuente === 'FALSE') {
                                                      dataTableTriplos[i].operador = finIf;
                                                }
                                          }
                                    }

                              }
                        }
                  }
            }
            if (ifElse) {
                  if (dataTableTriplos[i].operador === 'JUM') {
                        dataTableTriplos[i].DatosFuente = contLi + 1;
                  }
            } else {
                  if (dataTableTriplos[i].operador === 'JUM') {
                        dataTableTriplos[i].DatosFuente = contLi;
                  }
            }


      }
}

const AgragrTriplo = (Operador, DatoObj, DatoFuente) => {
      contLi++;
      dataTableTriplos.push({
            cont: contLi,
            operador: Operador,
            datoObj: DatoObj,
            DatosFuente: DatoFuente
      });
}