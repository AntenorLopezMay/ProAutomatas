import React from 'react'

export const TableSimbolos = ({ dataTable }) => {

      console.log(dataTable);
      return (
            <div className="tabla_simbolos col">
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
                                    dataTable.map((da, index) => (<tr key={index}><td>{da.lexemas}</td><td>{da.token}</td><td>{da.dato}</td></tr>))
                              }
                        </tbody>
                  </table>
            </div>
      )
}
