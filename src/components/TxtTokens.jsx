import { useState } from "react"


export const TxtTokens = ({ tokens }) => {

      // const [tokens, setTokens] = useState('');





      return (
            <div>
                  <textarea className="form-control" style={{ height: '500px', resize: 'none' }}
                        disabled value={tokens} >
                  </textarea>
            </div>
      )
}
