import { useState } from "react"

export const useData = (initialState = {}) => {

      const [values, setValues] = useState(initialState);

      const reset = () => {
            setValues(initialState);
      }


      const handleInputChange = ({ target }) => {
            setValues({
                  ...values,
                  [target.name]: target.value
            });
      }

      const adddata = () => {
            setValues({
                  ...values,

            })
      }

      return [values, handleInputChange, setValues];
}
