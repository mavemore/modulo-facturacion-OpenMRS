import {instance} from '../axios-orders';

export function getPaciente(uuid)
{
    return instance.get('/person/'+uuid);
}

export function buscarPaciente(query)
{
    return instance.get('/patient?q='+query);
}