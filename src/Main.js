import React, { useState } from "react";

function Input({id, type, state, placeholder, errorStyles, errorMsg}){
  const [_value, setValue] = useState("");

  return (
    <div className="relative mb-4">
      <label htmlFor={id}></label>
      {state || 
        <i className={errorStyles.icon}></i>
      }
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={_value}
        onChange={(e) => setValue(e.target.value)}
        className={`
        ${state ? 'focus:border-black' : errorStyles.input}
          p-4 mb-1 w-full
          border-2 rounded-md
          text-md font-semibold
          focus:outline-none focus:ring-0`}
      />
      <p className={`
        ${state ? 'hidden' : errorStyles.msg}
        text-xs text-right italic text-primary-red`}>
        {errorMsg}
      </p>
    </div>
  )
}

function Form() {
  const errorStyles = {
    icon: 'absolute right-0 mr-4 mt-4 p-3 bg-error bg-no-repeat',
    input: 'border-primary-red text-primary-red focus:border-primary-red',
    msg: 'block'
  }
  const [fields, setFields] = useState([
    {
      id: 'first-name',
      placeholder: 'First Name',
      type: 'text',
      state: true,
      errorMsg: 'First Name cannot be empty'
    },
    {
      id: 'last-name',
      placeholder: 'Last Name',
      type: 'text',
      state: true,
      errorMsg: 'Last Name cannot be empty'
    },
    {
      id: 'email',
      placeholder: 'Email',
      type: 'text',
      state: true,
      errorMsg: 'Looks like this is not an email'
    },
    {
      id: 'password',
      placeholder: 'Password',
      type: 'password',
      state: true,
      errorMsg: 'Password cannot be empty'
    }
  ])
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());
    
    setFields((fields) =>
      fields.map(field => ({
        ...field,
        state: !!(data[field.id])
      })
    ))
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-6 rounded-lg shadow-grey bg-white">
      {fields.map(({id, type, state, placeholder, errorMsg}) => (
        <Input
          id={id}
          key={id}
          type={type}
          state={state}
          placeholder={placeholder}
          errorMsg={errorMsg}
          errorStyles={errorStyles}/>
      ))}
      <button
        type="submit"
        className="
          mb-4 p-4 
          shadow-default-green bg-primary-green 
          active:shadow-active-green active:bg-green-300
          focus:outline-none
          rounded-md text-md font-normal text-white">
        CLAIM YOUR FREE TRIAL
      </button>
          
      <p className="text-center text-xs text-gray-400">
        By clicking the button, you are agreeing to our 
        <b src="#" className="cursor-pointer font-bold text-red-400"> Terms and Services</b>
      </p>
    </form>
  )
}

function Main() {
  return (
    <div className="
      flex flex-col w-full
      px-9 bg-primary-red bg-mobile 
      md:flex-row md:justify-center md:bg-desktop md:h-screen">
      <section className="
        flex flex-col my-24 justify-center space-y-6 text-center text-white
        md:max-w-xl md:pr-20 md:my-0 md:text-left">
        <h1 className="
          text-3xl font-semibold
          md:text-5xl">
          Learn to code by watching others
        </h1>
        <p>See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.</p>
      </section>

      <section className="
        flex flex-col mb-20 w-full justify-center
        md:max-w-xl md:mb-0">
        <div className="
          flex justify-center align-middle mb-7 py-4 px-10 
          rounded-lg shadow-grey bg-accent-blue text-center text-white">
          <p><b>Try it free 7 days</b> then $20/mo. thereafter</p>
        </div>
        <Form />
      </section>
    </div>
    );
}

export default Main;
