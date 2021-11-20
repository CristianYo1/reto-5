package com.usa.reto.Repository;

import com.usa.reto.Model.Client;
import com.usa.reto.Repository.Crud.RepositoryCrudClient;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryClient {
    
    @Autowired
    private RepositoryCrudClient repository;

    public List<Client> getAll(){
        return (List<Client>) repository.findAll();
    }
    
    public Optional<Client> getClient(int id){
        return repository.findById(id);
    }

    public Client save(Client client){
        return repository.save(client);
    }
    
    public void delete(Client client){
        repository.delete(client);
    }
}