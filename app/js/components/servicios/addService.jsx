import React , { Component } from 'react';
import {Link} from 'react-router';
import Input from '../UI/Input/Input';
import classes from './addService.css';



export default class addService extends Component {
    
    constructor(){
        super();
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Nombre...'
                    },
                    value: ''
                },
                codigo: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Codigo...'
                    },
                    value: ''
                },
                precio: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Precio'
                    },
                    value: ''
                },
                cantidad: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Cantidad'
                    },
                    value: ''
                },
                medida: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Medida'
                    },
                    value: ''
                }
            },
            loading: false
        };
    }

    orderHandler( event ){
        event.preventDefault();
    }

    inputChangedHandler (event, inputIdentifier) {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                 <Link to="/servicios"><button className="btn" type="submit">Agregar</button></Link>
                
            </form>
        );
        return(
            <div className={classes.ContactData}>
                <div class="button-group">
                    <label class="button" ng-model="propertyToSet" btn-radio="valueToSetItTo"> Display </label>
                    <label class="button" ng-model="propertyToSet" btn-radio="anotherValueToSetItTo"> Another </label>
                </div>
                <h4>Ingresa los datos del servicio</h4>
                {form}
            </div>
        );
    }
}