package com.usa.reto.Repository.Crud;

import com.usa.reto.Model.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RepositoryCrudReservation extends CrudRepository<Reservation, Integer>{
    public List<Reservation>findAllByStatus(String status);

    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);

    // select idClient, count(*) as "total" from Reservaciones group by idClient order by total desc;
        @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]> countTotalReservationsByClient();
}
