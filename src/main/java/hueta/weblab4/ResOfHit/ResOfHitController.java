package hueta.weblab4.ResOfHit;

import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ResOfHitController {
    private ResOfHitRepository resOfHitRepository;

    public ResOfHitController(ResOfHitRepository resOfHitRepository) {
        this.resOfHitRepository = resOfHitRepository;
    }

    @GetMapping("/resOfHit")
    public List<ResOfHit> getAllResults() {
        return (List<ResOfHit>) resOfHitRepository.findAll();
    }

    @PostMapping("/resOfHit")
    public void addNewResOfHit(@RequestBody ResOfHit resOfHit) {
        long scriptStartTime = System.nanoTime();
        float x = resOfHit.getX(), y = resOfHit.getY(), r = resOfHit.getR();
        resOfHit.setRes((x <= 0 && y >= 0 && x*x + y*y <= r*r) || (x <= 0 && y <= 0 && y >= -x * 2 - r && x >= -r / 2 - 2) || (x >= 0 && y <= 0 && x <= r/2 && y >= -r));
        resOfHit.setEx_at(new Timestamp(new java.util.Date().getTime()));
        resOfHit.setEx_ti((int) (System.nanoTime() - scriptStartTime));
        resOfHitRepository.save(resOfHit);
    }

    @DeleteMapping("/resOfHit")
    public void clearResults() {
        resOfHitRepository.deleteAll();
    }
}
