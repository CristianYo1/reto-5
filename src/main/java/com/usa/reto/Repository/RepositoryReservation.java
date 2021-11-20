package com.usa.reto.Repository;

import com.usa.reto.Model.Client;
import com.usa.reto.Model.Reservation;
import com.usa.reto.Report.ClientCounter;
import com.usa.reto.Repository.Crud.RepositoryCrudReservation;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepositoryReservation {
    
    @Autowired
    private RepositoryCrudReservation repository;

    public List<Reservation> getAll(){
        return (List<Reservation>) repository.findAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return repository.findById(id);
    }
    
    public Reservation save(Reservation reservation){
        return repository.save(reservation);
    }
    
    public void delete(Reservation reservation){
        repository.delete(reservation);
    }
    
    public List<Reservation> ReservationStatus (String status){
        return repository.findAllByStatus(status);
    }

    public List<Reservation> TimeReservation (Date a, Date b){
        return repository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }

    public List<ClientCounter> getTopClients(){
        List<ClientCounter> arr = new ArrayList<>();
        List<Object[]>report = repository.countTotalReservationsByClient();
        for(int i=0; i<report.size();i++){
            arr.add(new ClientCounter((Long)report.get(i)[1],(Client) report.get(i)[0]));
        }
        return arr;
    }
}