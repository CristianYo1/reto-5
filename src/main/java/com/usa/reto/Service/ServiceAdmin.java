package com.usa.reto.Service;

import com.usa.reto.Model.Admin;
import com.usa.reto.Repository.RepositoryAdmin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceAdmin {
    
    @Autowired
    private RepositoryAdmin repository;
    
    public List<Admin> getAll() {
        return repository.getAll();
    }
    
    public Optional<Admin> getAdmin(int id){
        return repository.getAdmin(id);
    }
    
    public Admin save(Admin c){
        if(c.getIdAdmin()== null){
            return repository.save(c);
        }else{
            Optional<Admin> aAux = repository.getAdmin(c.getIdAdmin());
            if(aAux.isEmpty()){
                return repository.save(c);
            }else{
                return c;
            }
        }
    }
    
    public Admin update(Admin admin){
	if(admin.getIdAdmin()!=null){
            Optional<Admin> aAux = repository.getAdmin(admin.getIdAdmin());
            if(!aAux.isEmpty()){
		if(admin.getName()!=null){
                    aAux.get().setName(admin.getName());
		}
                if(admin.getEmail()!=null){
                    aAux.get().setEmail(admin.getEmail());
		}
                if(admin.getPassword()!=null){
                    aAux.get().setPassword(admin.getPassword());
		}
                repository.save(aAux.get());
                return aAux.get();
            }else{
                return admin;                
            }
	}else{
            return admin;
        }
    }
    
    public boolean delete(int id){
        Boolean aBoolean = getAdmin(id).map(admin -> {
            repository.delete(admin);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}