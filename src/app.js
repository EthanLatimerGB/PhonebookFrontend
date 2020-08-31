import React, {useState, useEffect} from 'react'
import services from './components/services'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newPhoneN, setNewPhoneN] = useState("")
    const [filter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    
    useEffect(()=> {
        services.getAll().then(response => setPersons(response))
    }, [])

    const addPerson = (event) =>{
        var nameRepeats = false
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newPhoneN,
        }
        setPersons(persons.concat(nameObject))
            services.create(nameObject)
            .then(response => {
                setPersons(persons.concat(response))
            }
        )
        .catch(error => {
            setErrorMessage(`${error.data}`)
            setTimeout(() =>{
                setErrorMessage(null)
            }, 5000)
            console.log(error.response.data)
        })
        
        setNewName("")
        setNewPhoneN("")
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhoneN(event.target.value)
    }
        
    const contactsToShow = (event) =>{
        setFilter(event.target.value)
    }

    const deleteContact = (delObject) => {
        if(window.confirm("Are you sure you want to delete ", delObject.name)){
            services.deleteContact(delObject).then(response => {
                services.getAll().then(response => setPersons(response))
            }).catch(error => {
                alert('The contact for ', delObject.name, ' has encountered an error being deleted')
            })
        }
    }

    const ErrorMessage = ({message}) => {
        if (message === null) {
            return null
        }
        return(
            <div className='error'>
                {message}
            </div>
        )
    }

    return(
      <div>
        <h2>Phonebook</h2>
        <ErrorMessage message = {errorMessage}/>
        <form onSubmit={addPerson}> 
          <div> name: <input value={newName} onChange={handleNameChange}/> </div>
          <div> phone number: <input value={newPhoneN} onChange={handlePhoneChange}/> </div>
          <div> <button type="submit">add</button> </div>
        </form>
        <h2>Numbers</h2>
        <div>
            filter: <input value={filter} onChange={contactsToShow}/>
        </div>
        
        
        <div>
            {persons.filter(person => person.name.includes(filter)).map(filteredName => (
                <li key={filteredName.id} className='notes'>
                    {filteredName.name} : {filteredName.number} 
                    {<button onClick = {() => deleteContact(filteredName)}>Delete</button>}
                </li>
            ))}
        </div>  
      </div>
    )
      
}

export default App