
let Num_entero = /^-?\d+$/g;
const lsitEti = [];
const array_ensam = [];
var instruccion = '';
var etiqueta = '', fuente = '', destino = '';

export const codigoEnsamblador = (triplos) => {

      BuscarEtiqeu(triplos);
      generarCodigo(triplos);
      console.table(triplos);
      console.table(array_ensam);
      return array_ensam;
}


const BuscarEtiqeu = (Triplos) => {

      var operador = Triplos.map((dato) => {
            return dato.operador
      });

      for (var i = 0; i < operador.length; i++) {
            let lexema = operador[i] + '';
            let res = lexema.match(Num_entero);
            if (res != null) {
                  lsitEti.push(lexema);
            } else {
                  if (lexema === 'JMP') {
                        let dato = Triplos[i].DatosFuente;
                        lsitEti.push(dato);
                  }
            }

      }

}



const generarCodigo = (Triplos) => {
      var ban = false;
      var ff = false;
      var mul = false, div = false, mod = false;
      var operador = Triplos.map((dato) => {
            return dato.operador
      });


      for (var i = 0; i < operador.length; i++) {
            ban = false;
            ff = false;
            etiqueta = '';

            for (var j = 0; j < lsitEti.length; j++) {
                  let ss = i + '';
                  let num = lsitEti[j] + '';
                  if (ss === num) {
                        ff = true
                        // etiqueta = 'ETI-' + num + ':  ';

                        etiqueta = `ETI-${num}: `;

                        if (operador[i] === '') {
                              instruccion = '';
                              destino = '';
                              fuente = '';
                              agregar();
                              delete Triplos[i + 1];
                              // delete array_ensam[i + 1];
                        }
                  } else {
                        if (ff === false) {
                              etiqueta = '';
                        }
                  }
            }

            if (operador[i] === '=') {
                  instruccion = 'MOV';
                  ban = true;
            } else {
                  if (operador[i] === '+') {
                        ban = true;
                        instruccion = 'ADD';
                  } else {
                        if (operador[i] === '-') {
                              ban = true;
                              instruccion = 'SUB'
                        } else {
                              if (operador[i] === '*') {
                                    mul = true;
                                    instruccion = 'MOV';
                                    destino = 'BL';
                                    let datoFunte = Triplos[i].DatosFuente;
                                    fuente = datoFunte;
                                    agregar();
                                    instruccion = 'MUL';
                                    destino = 'BL';
                                    fuente = '';
                                    agregar();
                              } else {
                                    if (operador[i] === '/') {
                                          div = true;
                                          instruccion = 'MOV';
                                          destino = 'BL';
                                          let datoFunte = Triplos[i].DatosFuente;
                                          fuente = datoFunte;
                                          agregar();
                                          instruccion = 'DIV';
                                          destino = 'BL';
                                          fuente = '';
                                          agregar();
                                    } else {
                                          if (operador[i] === '%') {
                                                mod = true;
                                                instruccion = 'MOV';
                                                destino = 'BL';
                                                let datoFunte = Triplos[i].DatosFuente;
                                                fuente = datoFunte;
                                                agregar();
                                                instruccion = 'DIV';
                                                destino = 'BL';
                                                fuente = '';
                                                agregar();
                                          } else {
                                                if (operador[i] === '==') {
                                                      instruccion = 'EQ';
                                                      OpradoresRelaci(Triplos, i, instruccion);
                                                } else {
                                                      if (operador[i] === '>') {
                                                            instruccion = 'GT';
                                                            OpradoresRelaci(Triplos, i, instruccion);

                                                      } else {
                                                            if (operador[i] === '<=') {
                                                                  instruccion = 'LE';
                                                                  OpradoresRelaci(Triplos, i, instruccion);

                                                            } else {
                                                                  if (operador[i] === '<') {
                                                                        instruccion = 'LT';
                                                                        OpradoresRelaci(Triplos, i, instruccion);
                                                                  } else {
                                                                        if (operador[i] === '>=') {
                                                                              instruccion = 'GE';
                                                                              OpradoresRelaci(Triplos, i, instruccion);

                                                                        } else {
                                                                              if (operador[i] === '!=') {
                                                                                    instruccion = 'NE';
                                                                                    OpradoresRelaci(Triplos, i, instruccion);
                                                                              } else {
                                                                                    if (operador[i] === 'JMP') {
                                                                                          mul = false;
                                                                                          div = false;
                                                                                          instruccion = 'JMP';
                                                                                          fuente = '';
                                                                                          let eti = Triplos[i].DatosFuente;
                                                                                          // destino = 'ETI-' + eti;
                                                                                          destino = `ETI-${eti}`;
                                                                                          agregar();
                                                                                    }
                                                                              }
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    }
                              }
                        }
                  }
            }
            if (ban === true) {
                  let Temp = Triplos[i].datoObj;
                  if (operador[i + 1] === '*') {
                        destino = 'AL';
                  } else {
                        if (operador[i + 1] === '/' && mul === true) {
                              destino = 'BX';
                              fuente = 'AX';
                              agregar();
                              destino = 'AX';
                        } else {
                              if (Temp === 'T1') {
                                    destino = 'AX';
                              } else {
                                    if (Temp === 'T2') {
                                          destino = 'BX';
                                    } else {
                                          destino = Temp;
                                    }
                              }
                        }
                  }
                  let datoFunte = Triplos[i].DatosFuente;

                  if (div === true && mul === true) {
                        destino = 'BH';
                        fuente = 'AL';
                        div = false; mul = false;
                  } else {
                        if (div === true) {
                              if (datoFunte === 'T1') {
                                    fuente = 'AL';
                              } else {
                                    if (datoFunte === 'T2') {
                                          fuente = 'AL';
                                    } else {
                                          fuente = datoFunte;
                                    }
                              }
                              div = false;
                        } else {
                              if (mod === true) {
                                    if (datoFunte === 'T1') {
                                          fuente = 'AH';
                                    } else {
                                          if (datoFunte === 'T2') {
                                                fuente = 'AH';
                                          } else {
                                                fuente = datoFunte;
                                          }
                                    }
                                    mod = false;
                              } else {
                                    if (datoFunte === 'T1') {
                                          fuente = 'AX';
                                    } else {
                                          if (datoFunte === 'T2') {
                                                fuente = 'BX';
                                          } else {
                                                fuente = datoFunte;
                                          }
                                    }
                              }
                        }
                  }
                  agregar();
            }

      }

}

const OpradoresRelaci = (Triplos, i, segundainstr) => {
      instruccion = 'CMP';
      let Temp = Triplos[i].datoObj;

      if (Temp === 'T1') {
            destino = 'AX';
      } else {
            if (Temp === 'T2') {
                  destino = 'BX';
            } else {
                  destino = Temp;
            }
      }
      let datoFuntes = Triplos[i].DatosFuente;
      if (datoFuntes === 'T1') {
            fuente = 'AX';
      } else {
            if (datoFuntes === 'T2') {
                  fuente = 'BX';
            } else {
                  fuente = datoFuntes;
            }
      }

      agregar();

      instruccion = segundainstr;
      let eti = Triplos[i + 1].operador;
      destino = 'ETI-' + eti;
      fuente = '';
      agregar();
      eti = Triplos[i + 2].operador;
      destino = 'ETI-' + eti;
      instruccion = 'JMP';
      agregar();

}


const agregar = () => {
      array_ensam.push({ etiqueta: etiqueta, instruccion: instruccion, destino: destino, fuente: fuente });
}

