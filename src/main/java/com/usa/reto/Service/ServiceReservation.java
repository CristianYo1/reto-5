package com.usa.reto.Service;

import com.usa.reto.Model.Reservation;
import com.usa.reto.Report.ClientCounter;
import com.usa.reto.Report.ReservationStatus;
import com.usa.reto.Repository.RepositoryReservation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceReservation {
    
    @Autowired
    private RepositoryReservation repository;
    
    public List<Reservation> getAll() {
        return repository.getAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return repository.getReservation(id);
    }
    
    public Reservation save(Reservation r){
        if(r.getIdReservation() == null){
            return repository.save(r);
        }else{
            Optional<Reservation> rAux = repository.getReservation(r.getIdReservation());
            if(rAux.isEmpty()){
                return repository.save(r);
            }else{
                return r;
            }
        }
    }
    
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation> rAux = repository.getReservation(reservation.getIdReservation());
            if(!rAux.isEmpty()){

                if(reservation.getStartDate()!=null){
                    rAux.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    rAux.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    rAux.get().setStatus(reservation.getStatus());
                }
                repository.save(rAux.get());
                return rAux.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }

    public boolean delete(int id) {
        Boolean aBoolean = getReservation(id).map(reservation -> {
            repository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    public ReservationStatus getReportReservationStatus() {
        List<Reservation> completed = repository.ReservationStatus("completed");
        List<Reservation> cancelled = repository.ReservationStatus("cancelled");
        return new ReservationStatus(completed.size(), cancelled.size());
    }
    
    public List<Reservation> getReportsTimeReservations(String dateA, String dateB) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne = new Date();
        Date dateTwo = new Date();
        try {
            dateOne = format.parse(dateA);
            dateTwo = format.parse(dateB);
        } catch (ParseException evt) {
        }
        if (dateOne.before(dateTwo)) {
            return repository.TimeReservation(dateOne, dateTwo);
        } else {
            return new ArrayList<>();
        }
    }
    
    public List<ClientCounter> ServiceTopClients() {
        return repository.getTopClients();
    }
}