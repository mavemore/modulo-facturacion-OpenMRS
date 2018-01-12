import React , { Component } from 'react';
import {Link} from 'react-router';
import Input from '../UI/Input/Input';
import classes from './ingresarServicio.css';


class ingresarServicio extends Component {
    state = {
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
    }
    orderHandler = ( event ) => {
        event.preventDefault();
    }

    inputChangedHandler = (event, inputIdentifier) => {
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
                <h4>Ingresa los datos del servicio</h4>
                {form}
            </div>
        );
    }
}