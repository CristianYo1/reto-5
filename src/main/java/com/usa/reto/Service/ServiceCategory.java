package com.usa.reto.Service;

import com.usa.reto.Model.Category;
import com.usa.reto.Repository.RepositoryCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCategory {
    
    @Autowired
    private RepositoryCategory repository;
    
    public List<Category> getAll() {
        return repository.getAll();
    }
    
    public Optional<Category> getCategory(int id){
        return repository.getCategory(id);
    }
    
    public Category save(Category c){
        if(c.getId() == null){
            return repository.save(c);
        }else{
            Optional<Category> cAux = repository.getCategory(c.getId());
            if(cAux.isEmpty()){
                return repository.save(c);
            }else{
                return c;
            }
        }
    }
    
    public Category update(Category category){
        if(category.getId()!=null){
            Optional<Category> cAux = repository.getCategory(category.getId());
            if(!cAux.isEmpty()){
                if(category.getDescription()!=null){
                    cAux.get().setDescription(category.getDescription());
                }
                if(category.getName()!=null){
                    cAux.get().setName(category.getName());
                }
                return repository.save(cAux.get());
            }
        }
        return category;
    }
    
    public boolean delete(int id){
        Boolean aBoolean = getCategory(id).map(category -> {
            repository.delete(category);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}