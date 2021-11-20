package com.usa.reto.Repository;

import com.usa.reto.Model.Score;
import com.usa.reto.Repository.Crud.RepositoryCrudScore;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryScore {
    
    @Autowired
    private RepositoryCrudScore repository;

    public List<Score> getAll(){
        return (List<Score>) repository.findAll();
    }
    
    public Optional<Score> getScore(int id){
        return repository.findById(id);
    }
    
    public Score save(Score score){
        return repository.save(score);
    }
    
    public void delete(Score score){
        repository.delete(score);
    }
}