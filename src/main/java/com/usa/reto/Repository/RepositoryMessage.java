package com.usa.reto.Repository;

import com.usa.reto.Repository.Crud.RepositoryCrudMessage;
import com.usa.reto.Model.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryMessage {
    
    @Autowired
    private RepositoryCrudMessage repository;
    
    public List<Message> getAll(){
        return (List<Message>) repository.findAll();
    }
    
    public Optional<Message> getMessage(int id){
        return repository.findById(id);
    }

    public Message save(Message message){
        return repository.save(message);
    }
    
    public void delete(Message message){
        repository.delete(message);
    }
}