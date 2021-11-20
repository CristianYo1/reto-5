package com.usa.reto.Service;

import com.usa.reto.Model.Cloud;
import com.usa.reto.Repository.RepositoryCloud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceCloud {
    
    @Autowired
    private RepositoryCloud repository;
    
    public List<Cloud> getAll() {
        return repository.getAll();
    }
    
    public Optional<Cloud> getCloud(int id){
        return repository.getCloud(id);
    }
    
    public Cloud save(Cloud c){
        if(c.getId()== null){
            return repository.save(c);
        }else{
            Optional<Cloud> cAux = repository.getCloud(c.getId());
            if(cAux.isEmpty()){
                return repository.save(c);
            }else{
                return c;
            }
        }
    }
    
    public Cloud update(Cloud cloud){
	if(cloud.getId()!=null){
            Optional<Cloud> cAux = repository.getCloud(cloud.getId());
            if(!cAux.isEmpty()){
		if(cloud.getName()!=null){
                    cAux.get().setName(cloud.getName());
		}
                if(cloud.getBrand()!=null){
                    cAux.get().setBrand(cloud.getBrand());
		}
                if(cloud.getYear()!=null){
                    cAux.get().setYear(cloud.getYear());
		}
                if(cloud.getDescription()!=null){
                    cAux.get().setDescription(cloud.getDescription());
		}
                if(cloud.getCategory()!=null){
                    cAux.get().setCategory(cloud.getCategory());
		}
                repository.save(cAux.get());
                return cAux.get();
            }else{
                return cloud;                
            }
	}else{
            return cloud;
        }
    }
    
    public boolean delete(int id){
        Boolean aBoolean = getCloud(id).map(cloud -> {
            repository.delete(cloud);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}