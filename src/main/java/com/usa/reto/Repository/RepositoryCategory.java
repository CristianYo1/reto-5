package com.usa.reto.Repository;

import com.usa.reto.Model.Category;
import com.usa.reto.Repository.Crud.RepositoryCrudCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryCategory{

    @Autowired
    private RepositoryCrudCategory repository;
    
    public List<Category> getAll(){
        return (List<Category>) repository.findAll();
    }
    
    public Optional<Category> getCategory(int id){
        return repository.findById(id);
    }

    public Category save(Category category){
        return repository.save(category);
    }
    
    public void delete(Category category){
       repository.delete(category);
    }   
}