package com.usa.reto.Repository;

import com.usa.reto.Model.Cloud;
import com.usa.reto.Repository.Crud.RepositoryCrudCloud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryCloud {
    
    @Autowired
    private RepositoryCrudCloud repository;

    public List<Cloud> getAll(){
        return (List<Cloud>) repository.findAll();
    }

    public Optional<Cloud> getCloud(int id){
        return repository.findById(id);
    }

    public Cloud save(Cloud cloud){
        return repository.save(cloud);
    }
    
    public void delete(Cloud cloud){
        repository.delete(cloud);
    }
}