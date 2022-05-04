import { Expreciones } from "../data/Expreciones";

const categoriesInitial = [{
      lexema: '----',
      token: '----',
      typeData: '----'
}];
const errorTablesDataInitial = [{
      tokenError: '---',
      lexema: '---',
      linea: '---',
      descripcion: '---'
}]

let cont = 0;

export const Lexemas = (prog) => {
      let errorTablesData = errorTablesDataInitial;
      let symbolTableData = categoriesInitial;


      errorTablesData = [];
      symbolTableData = [];

      let tokens = '';
      let lineasErr = '';
      const arryProg = prog.split("\n");
      const initialExpreciones = Expreciones;
      let ban = false;
      let type = '---';
      if (prog !== "") {
            arryProg.forEach(data => {
                  cont++;
                  const arryLine = data.split(" ");
                  if (cont !== 1) tokens = tokens + '\n';
                  arryLine.forEach(lexema => {

                        if (lexema !== "") {
                              initialExpreciones.forEach(expre => {
                                    if (lexema.match(expre.regExp) != null) {
                                          ban = true;
                                          if (expre.id === 9) type = lexema;
                                          if (expre.id === 5 || expre.id === 3 || expre.id === 2 || lexema === ';') type = '---';
                                          (expre.id === 8) ? tokens = tokens + addsymbolTableData(lexema, expre, symbolTableData, type)
                                                : tokens = tokens + addsymbolTableData(lexema, expre, symbolTableData, '---')
                                    } else {
                                          if (ban !== true && expre.regExp === null) {
                                                const { tokens: to, lineasErr: err } = adderrorTablesData(lexema, expre, errorTablesData, prog);
                                                tokens = tokens + to + '';
                                                lineasErr = err;
                                          }
                                    }
                              })

                              ban = false;
                        }

                  });
            });

            let errorCont = errorSemantico(errorTablesData, symbolTableData, prog);
            errorindefinido(errorTablesData, symbolTableData, prog, errorCont);
      }


      initialExpreciones.forEach(x => x.cont = 0);
      // initialExpreciones = Expreciones;
      ban = false;
      lineasErr = '';
      cont = 0;
      const tablaError = errorTablesData;
      return { symbolTableData, tokens, tablaError };
}
const addsymbolTableData = (lexema, expre, symbolTableData, type) => {
      let tokens = '';
      if (symbolTableData.some(x => x.lexema === lexema)) {
            let datos = symbolTableData.find(x => x.lexema === lexema);
            tokens = datos.token + " ";
      } else {
            expre.cont = expre.cont + 1;
            tokens = expre.token + expre.cont + " ";
            symbolTableData.push({
                  lexema: lexema,
                  token: expre.token + expre.cont,
                  typeData: type
            })
      }
      return tokens;

}
const adderrorTablesData = (lexema, expre, errorTablesData, prog) => {

      let tokens = '';
      let lineasErr = '';
      if (errorTablesData.some(x => x.lexema === lexema)) {
            let datos = errorTablesData.find(x => x.lexema === lexema);
            tokens = datos.tokenError + " ";
      } else {
            expre.cont = expre.cont + 1
            lineasErr = `[${cont}]`;
            tokens = expre.token + expre.cont + " ";
            let lin = buscarError(lexema, prog);

            errorTablesData.push({
                  tokenError: expre.token + expre.cont,
                  lexema: lexema,
                  linea: lin,
                  descripcion: expre.name
            });
      }


      return { tokens, lineasErr };
}
const buscarError = (lexema, prog) => {

      let lineas = '';
      let contL = 0;
      let arryCod = prog.split("\n");
      let ban = false;

      arryCod.forEach(data => {
            let fila = data.split(" ");
            contL++;
            ban = false;
            fila.forEach(x => {
                  if (lexema === x) {
                        if (!ban) {
                              ban = true;
                              lineas = lineas + `[ ${contL} ]`;
                        }
                  }
            });

      });

      return lineas;
}
const errorSemantico = (errorTablesData, symbolTableData, prog) => {
      let expr = Expreciones.find(x => x.id === 8);
      let erroL = Expreciones.find(x => x.id === 11);
      let cont = 0;
      symbolTableData.forEach(data => {
            if (data.lexema.match(expr.regExp) !== null) {
                  if (data.typeData === '---') {
                        erroL.cont = erroL.cont + 1;
                        let lin = buscarError(data.lexema, prog);
                        errorTablesData.push({
                              tokenError: 'ERL' + erroL.cont,
                              lexema: data.lexema,
                              linea: lin,
                              descripcion: 'Variable indefinida'
                        });
                  }
            }
      });
      return cont;
}
const errorindefinido = (errorTablesData, symbolTableData, prog, errorCont) => {
      let expr = Expreciones.find(x => x.id === 8);
      let asig = Expreciones.find(x => x.id === 4);
      let num = Expreciones.find(x => x.id === 6);
      const arryProg = prog.split("\n");
      let ban = false;
      let banError = false;
      let typeData = '';
      let contl = 0;
      arryProg.forEach(data => {
            const arryLine = data.split(" ");
            let op = validarLinea(arryLine, asig);
            ban = false;
            banError = false;
            contl++;
            arryLine.forEach(lexema => {
                  if (lexema !== "" && op === true) {
                        if (lexema.match(expr.regExp) !== null || lexema.match(num.regExp) !== null) {
                              let tipo = symbolTableData.find(x => x.lexema === lexema);
                              if (tipo.typeData !== '---' && ban === false) {
                                    // console.log(tipo.typeData, '===> ', lexema);
                                    typeData = tipo.typeData;
                                    ban = true;
                              } else {
                                    if ((typeData === 'eocaracter#' || typeData === 'uientero#') && tipo.typeData !== '---' && banError === false) {
                                          if (tipo.typeData === 'oacadena#') {
                                                banError = true;
                                                errorCont++;
                                                errorTablesData.push({
                                                      tokenError: 'ERSem' + errorCont,
                                                      lexema: lexema,
                                                      linea: `[ ${contl} ]`,
                                                      descripcion: `Incompatiblidad de tipos ${typeData}`
                                                });
                                          }
                                    } else {
                                          if (typeData === 'oacadena#' && banError === false) {
                                                if (tipo.typeData !== 'oacadena#' || lexema.match(num.regExp) !== null) {
                                                      banError = true;
                                                      errorCont++;
                                                      errorTablesData.push({
                                                            tokenError: 'ERSem' + errorCont,
                                                            lexema: lexema,
                                                            linea: `[ ${contl} ]`,
                                                            descripcion: `Incompatiblidad de tipos ${typeData}`
                                                      });
                                                }
                                          }
                                    }
                              }
                        }

                  }
            });
      });
}

const validarLinea = (linea, sig) => {
      let resp = false;
      linea.forEach(lexema => {
            if (lexema.match(sig.regExp) !== null) {
                  resp = true;
                  return resp;
            }
      })
      return resp;
}