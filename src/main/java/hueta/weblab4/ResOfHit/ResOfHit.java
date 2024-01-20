package hueta.weblab4.ResOfHit;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.sql.Timestamp;


@Entity
@Getter
@Setter
@Table(name = "res_of_hit")
public class ResOfHit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private float x;
    private float y;
    private float r;
    private boolean res;
    private Timestamp ex_at;
    private int ex_ti;

    public ResOfHit(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public ResOfHit() {}
}