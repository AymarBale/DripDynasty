import React from 'react'

const InputComponent = ({ text, type, id, name, value }) => (
    <div>
        <label htmlFor={id}>{text}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
        />
    </div>
)

export default InputComponent
