import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/historique'

const Historique = () => {
    const [jsonData, setJsonData] = useState([])

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/trouverCommande',
            timeout: 4000
        })
            .then((response) => {
                const commands = response.data

                const groupedCommands = commands.reduce((result, command) => {
                    const key = `${command.user_id}-${command.command_date}`
                    result[key] = result[key] || []
                    result[key].push(command)
                    return result
                }, {})

                setJsonData(groupedCommands)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données :', error)
            })
    }, [])

    return (
        <div className='historique'>
            {Object.keys(jsonData).map((groupKey) => {
                const [userId, date] = groupKey.split('-')

                return (
                    <div key={groupKey} className='histo-command'>
                        <div className='histo-user'>
                            <div>User ID : {userId}</div> <div>Date : {date}</div>
                        </div>
                        {jsonData[groupKey].map((command) => (
                            <div key={command.Command_id}>
                                <div className='histo-prod'>
                                    <div>ID produit : {command.product_id}</div> <div>Quantité : {command.quantite}</div> <div>Prix : {command.prix}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

export default Historique
