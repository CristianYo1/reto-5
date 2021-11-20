package com.usa.reto.Repository.Crud;

import com.usa.reto.Model.Message;
import org.springframework.data.repository.CrudRepository;

public interface RepositoryCrudMessage extends CrudRepository<Message, Integer>{
    
}
