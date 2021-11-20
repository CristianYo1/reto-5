package com.usa.reto.Repository;

import com.usa.reto.Model.Admin;
import com.usa.reto.Repository.Crud.RepositoryCrudAdmin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryAdmin {
    
    @Autowired
    private RepositoryCrudAdmin repository;

    public List<Admin> getAll(){
        return (List<Admin>) repository.findAll();
    }
    
    public Optional<Admin> getAdmin(int id){
        return repository.findById(id);
    }

    public Admin save(Admin admin){
        return repository.save(admin);
    }
    
    public void delete(Admin admin){
        repository.delete(admin);
    }
}