import React from 'react'
import {Table} from 'reactstrap'
  
export default class ExibirEscola extends React.Component {

    constructor(props) {
        super(props)
        this.state = {'data' : props.children}
    }

    componentDidMount = data => {
        
    }

    render = () => {
        return (
            <div>
                <Table borderless striped>
                    <thead>
                        <tr>
                            <th>Escola</th>
                            <th>Bairro</th>
                            <th>Endereço</th>
                            <th>Esfera</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>    
                        { 
                            this.state.data.map(item => (
                                <tr>
                                    <td>{item.escola}</td> 
                                    <td>{item.bairro}</td>
                                    <td>{item.endereco}</td>
                                    <td>{item.esfera}</td>
                                    <td>{item.tipo}</td>
                                </tr> 
                            )) 
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}