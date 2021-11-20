package com.usa.reto.Service;

import com.usa.reto.Model.Client;
import com.usa.reto.Repository.RepositoryClient;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceClient {
    
    @Autowired
    private RepositoryClient repository;
    
    public List<Client> getAll() {
        return repository.getAll();
    }
    
    public Optional<Client> getClient(int id){
        return repository.getClient(id);
    }
    
    public Client save(Client c){
        if(c.getIdClient()== null){
            return repository.save(c);
        }else{
            Optional<Client> cAux = repository.getClient(c.getIdClient());
            if(cAux.isEmpty()){
                return repository.save(c);
            }else{
                return c;
            }
        }
    }
    
    public Client update(Client client){
        if(client.getIdClient()!=null){
            Optional<Client> cAux = repository.getClient(client.getIdClient());
            if(!cAux.isEmpty()){
                if(client.getEmail()!=null){
                    cAux.get().setEmail(client.getEmail());
                }
                if(client.getPassword()!=null){
                    cAux.get().setPassword(client.getPassword());
                }
                if(client.getName()!=null){
                    cAux.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    cAux.get().setAge(client.getAge());
                }
                repository.save(cAux.get());
                return cAux.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }
    
    public boolean delete(int id){
        Boolean aBoolean = getClient(id).map(client -> {
            repository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}