import React from 'react'
import './escola.css'
import { Button, Form, FormGroup, Label, Input, Container, Alert, Row, Col, Table } from 'reactstrap';
import Loading from 'react-loading-bar'

export default class BuscarEscola extends React.Component {

    constructor(props) {
        super(props)
        this.state ={bairro: '', escola: '', esfera:'', tipo:'', loading: true, data: [], dataEmpty : false}

        this.handleChangeEsfera = this.handleChangeEsfera.bind(this)
        this.handleChangeTipo = this.handleChangeTipo.bind(this)
        this.handleChangeBairro = this.handleChangeBairro.bind(this)
        this.handleChangeEscola= this.handleChangeEscola.bind(this)
    }

    handleChangeEsfera = event => {this.setState({esfera: event.target.value})}
    handleChangeTipo   = event => {this.setState({tipo: event.target.value})}
    handleChangeBairro = event => {this.setState({bairro: event.target.value})}
    handleChangeEscola = event => {this.setState({escola: event.target.value})}
    

    componentDidMount = data => {
        this.setState({'loading': true, 'data': []})
        fetch('https://creches-api.herokuapp.com/api/v0/creches/page/0')
        .then(res => res.json())
        .then((result) => {
            this.setState({'loading' : false, 'data': result})
        })       
    }


    composeURL = (state, stateName, haveParameters) => {
        if(state !== '' && haveParameters) {
            return `&${stateName}=${state}`
        } else if(state !== '' && !haveParameters) {
            return `?${stateName}=${state}`
        } else {
            return ''
        }
    }

    loadData = event => {
        
        this.setState({loading : true})
        let urlBase = 'https://creches-api.herokuapp.com/api/v0/creches/creche'
        
    
        let parameters = [
            {'state': this.state.esfera, 'stateName': 'esfera'},
            {'state': this.state.escola, 'stateName': 'nome'},
            {'state': this.state.tipo,   'stateName': 'tipo'},
            {'state': this.state.bairro, 'stateName': 'bairro'}
        ].forEach(parameter => {
            urlBase += this.composeURL(parameter.state, parameter.stateName, urlBase.includes('?'))
        })

        fetch(urlBase)
        .then(res => res.json())
        .then(result => {
            this.setState(
                {'loading' : false, 'data': result, 'dataEmpty': result.length === 0}
            )
        })        
    }

    render = () => {
        return (
        <div>
            <Container>
                <Alert color="warning">
                <Loading show={this.state.loading} color="yellow"/>
                    Encontre a creche que procura no município de São Paulo através da busca abaixo
                </Alert>

                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="txtBairro">Bairro</Label>
                                <Input id="txtBairro" value={this.state.bairro} onChange={this.handleChangeBairro} />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="txtEscola">Escola</Label>
                                <Input id="txtEscola" value={this.state.escola} onChange={this.handleChangeEscola} />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="selectEsfera">Esfera</Label>
                                <Input type="select" id="selectEsfera" value={this.state.esfera} onChange={this.handleChangeEsfera}>
                                    <option value="">TODAS</option>
                                    <option value="ESTADUAL-SE">ESTADUAL-SE</option>
                                    <option value="MUNICIPAL"> MUNICIPAL</option>
                                    <option value="PARTICULAR">PARTICULAR</option>
                                    <option value="ESTADUAL-OUT">ESTADUAL-OUT</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="selectTipo">Tipo</Label>
                                <Input type="select" id="selectTipo" value={this.state.tipo} onChange={this.handleChangeTipo}>
                                    <option value="">TODAS</option>
                                    <option value="EEI">EEI</option>
                                    <option value="EMEI"> EMEI</option>
                                    <option value="CEI DIRET">CEI DIRET</option>
                                    <option value="CEMEI">CEMEI</option>
                                    <option value="CCI/CIPS">CCI/CIPS</option>
                                    <option value="CEI INDIR">CEI INDIR</option>
                                    <option value="CR.P.CONV">CR.P.CONV</option>
                                    <option value="CCI">CCI</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 'auto', offset: 5 }}>
                            <Button outline color="warning" onClick={this.loadData.bind(this)}>Procurar Escola</Button>
                        </Col>
                    </Row>
                </Form>
                </Container>
                <Container>
                    <Table className="tableEscolas" borderless striped hover>
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
                                        <td>{item.equipamento}</td> 
                                        <td>{item.bairro}</td>
                                        <td>{item.endereco}</td>
                                        <td>{item.esfera}</td>
                                        <td>{item.tipo}</td>
                                    </tr> 
                                )) 
                            }
                        </tbody>
                    </Table>
                    <Alert color="info" isOpen={this.state.dataEmpty}>
                        Nenhum registro foi encontrado =(
                    </Alert>
            </Container>
        </div>
        )
    }
}