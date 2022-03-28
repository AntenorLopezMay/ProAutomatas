import React, { useState } from 'react'

export const TextArea = ({ setValues }) => {

      const [text, setText] = useState('');

      const handleInputChange = (e) => setText(e.target.value);

      const handleSubmit = (e) => {
            e.preventDefault();
            setValues(text);
      }

      return (
            <div>
                  <form onSubmit={handleSubmit} className="flexfrom" >
                        <textarea className="form-control"
                              style={{ height: '300px', resize: 'none' }}
                              name="text"
                              value={text}
                              onChange={handleInputChange}
                              type="text">
                        </textarea>
                        <button type="submit" className="btn btn-danger">Generar</button>
                  </form>
            </div>
      );
}
