
import { useEffect, useLayoutEffect, useState } from "react";
import { TableSimbolos } from "./components/TableSimbolos";
import { TextArea } from "./components/TextArea";
import { TxtTokens } from "./components/TxtTokens";
import { Lexemas } from "./js/Lexemas";
import { Triplos } from "./js/Triplos";

export const AutomatasApp = () => {
      const categoriesInitial = [{
            lexema: '----',
            token: '----',
            typeData: '----'
      }];
      const [programa, setPrograma] = useState('');

      const [symbolTableData, setSymbolTableData] = useState(categoriesInitial);
      const [tokens, setTokens] = useState('');
      const [errorTable, setErrorTable] = useState([]);

      const [triplos, setTriplos] = useState([]);
      useEffect(() => {
            const { symbolTableData: data, tokens, tablaError } = Lexemas(programa);
            let triplos = Triplos(programa);
            setTriplos(triplos);
            setSymbolTableData(data);
            setTokens(tokens);
            setErrorTable(tablaError);
            console.log(tablaError);
      }, [programa]);

      const GenerarPrograma = () => {
            const blob = new Blob([programa], { type: "text/plain" });
            downloadFile(blob, "programa.txt");
      }
      const GenerarTablToken = () => {
            const Tokens = new Blob([tokens], { type: "text/plain" });
            downloadFile(Tokens, "tokens.txt");
      }



      const downloadFile = (blob, filname) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filname;
            a.click();
      }
      const GenerarTablTrip = () => {
            let triploStr = '';
            triploStr = triplos.map((data, index) => {
                  if (data.operador !== '---') {
                        return `${index}        ${data.operador}        ${data.datoObj}        ${data.DatosFuente}\n`
                  }
            })
            const Sim = new Blob([triploStr], { type: "text/plain" });
            downloadFile(Sim, "Triplo.txt");
      }


      return (
            <div className="container-fluid row mt-3">
                  <div className="col-5 ">
                        <div className="row">
                              <TextArea setValues={setPrograma} />
                        </div>

                        <div className="row ">
                              <TxtTokens tokens={tokens} />
                        </div>

                        <div>
                              <button type="button" className="col btn btn-secondary btn-sm" onClick={GenerarPrograma}> Generar Programa</button>
                              <button type="button" className="col btn btn-secondary btn-sm" onClick={() => GenerarTablToken()}>Generar Tabla de token</button>
                              <button type="button" className="row btn btn-secondary btn-sm" onClick={() => GenerarTablTrip()}>Generar Tabla de triplos</button>

                        </div>
                  </div>

                  <div className="col-7 text-center flexTable">
                        <div className="">
                              <table className="table table-hover">
                                    <thead>
                                          <tr>
                                                <th>Lexema</th>
                                                <th>Token</th>
                                                <th>Tipo de datos</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {
                                                symbolTableData.map((da, index) => (<tr key={index}><td>{da.lexema}</td><td>{da.token}</td><td>{da.typeData}</td></tr>))
                                          }
                                    </tbody>
                              </table>
                        </div>


                        <div className="">
                              <table className="table table-hover">
                                    <thead>
                                          <tr>
                                                <th>Token de error</th>
                                                <th>Lexema</th>
                                                <th>Línea</th>
                                                <th>Descripcón</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {
                                                errorTable.map((da, index) => (<tr key={index}><td>{da.tokenError}</td><td>{da.lexema}</td><td>{da.linea}</td><td>{da.descripcion}</td></tr>))

                                          }
                                    </tbody>
                              </table>
                        </div>

                  </div>



            </div>

      )
}
