import {instance} from '../axios-orders';

function getPaciente(uuid)
{
    return instance.get('/person/'+uuid);
}

function buscarPaciente(query)
{
    return instance.get('/patient?q='+query);
}

var helpers = {
    getPacientes: function(query){
        return instance.all(buscarPaciente(query))
        .then(function(res){
    return {res}
        })
}}