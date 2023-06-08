const AddNewPersonForm = ({ name, number, nameChangeHandler, numberChangeHandler, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input 
        value={name}
        onChange={nameChangeHandler}
      />
    </div>
    <div>
      number: <input 
        value={number}
        onChange={numberChangeHandler}
      />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
  )
}

export default AddNewPersonForm
  