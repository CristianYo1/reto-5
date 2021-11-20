package com.usa.reto.Service;

import com.usa.reto.Model.Score;
import com.usa.reto.Repository.RepositoryScore;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceScore {

    @Autowired
    private RepositoryScore repository;

    public List<Score> getAll() {
        return repository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return repository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getStars() >= 0 && score.getStars() <= 5) {
            if (score.getIdScore() == null) {
                return repository.save(score);
            } else {
                Optional<Score> sAux = repository.getScore(score.getIdScore());
                if (sAux.isEmpty()) {
                    return repository.save(score);
                }
            }

        }
        return score;
    }

    public Score update(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> sAux = repository.getScore(score.getIdScore());
            if (!sAux.isEmpty()) {
                if (score.getMessageText() != null) {
                    sAux.get().setMessageText(score.getMessageText());
                }
                if (score.getStars() != null && score.getStars() >= 0 && score.getStars() <= 5) {
                    sAux.get().setStars(score.getStars());
                }
                repository.save(sAux.get());
                return sAux.get();
            } else {
                return score;
            }
        } else {
            return score;
        }
    }

    public boolean delete(int id) {
        Optional<Score> score = getScore(id);
        if (score.isEmpty()) {
            return false;
        } else {
            repository.delete(score.get());
            return true;
        }
    }
}
