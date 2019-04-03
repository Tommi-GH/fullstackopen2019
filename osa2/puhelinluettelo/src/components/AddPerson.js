import React from 'react'

const AddPerson = ({saveForm, newName, handleNameChange, newPhone, handlePhoneChange}) => (
    <div>
    <h2>Lisää uusi</h2>
            <form onSubmit={saveForm}>
                <div>
                    Nimi: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Puh: <input value={newPhone} onChange={handlePhoneChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            </div>
)

export default AddPerson