export const Expreciones = [
      {
            id: 1,
            name: 'separadores',
            regExp: /(\()|(\))|(\[)|(\])|(\{)|(\})|(^;)|(^,)/g,
            token: 'SEP',
            cont: 0
      },
      {
            id: 2,
            name: 'Aritmeticos',
            regExp: /(^\+$)|(^\-$)|(^\*$)|(^%$)|(^\/$)/g,
            token: 'OA',
            cont: 0
      },
      {
            id: 3,
            name: 'Relacionales',
            regExp: /(^<=$)|(^==$)|(^>$)|(^<$)|(^>=$)|(^!=$)/g,
            token: 'OR',
            cont: 0
      },
      {
            id: 4,
            name: 'Asiganción',
            regExp: /(^=$)/g,
            token: 'OAS',
            cont: 0
      },
      {
            id: 5,
            name: 'Booleanos',
            regExp: /(^&&$)|(^\|\|$)/g,
            token: 'OL',
            cont: 0
      },
      {
            id: 6,
            name: 'Enteros',
            regExp: /^-?\d+$/g,
            token: 'NE',
            cont: 0
      },
      {
            id: 7,
            name: 'numeros con punto decimal',
            regExp: /^-?\d+\.\d+$/g,
            token: 'NPD',
            cont: 0
      },
      {
            id: 8,
            name: 'id',
            regExp: /^A{2}R\,[ -| @ | # ][1-9]+$/g,
            token: 'VAR',
            cont: 0
      },
      {
            id: 9,
            name: 'Tipos De Datos',
            regExp: /(^uientero#$)|(^oacadena#$)|(^eocaracter#$)/g,
            token: 'TD',
            cont: 0
      },
      {
            id: 10,
            name: 'if',
            regExp: /(^if$)|(^then$)|(^else$)/g,
            token: 'AR',
            cont: 0
      },
      {
            id: 11,
            name: 'Error Léxico',
            regExp: null,
            token: 'ERL',
            cont: 0
      }

]