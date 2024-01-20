import {Component, ElementRef, ViewChild} from '@angular/core'
import {AppComponent} from "../app.component"
import {MainpageService} from "./mainpage.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';

class ResOfHit{
  constructor(public res_id: number, public x: number, public y: number, public r: number, public res: boolean, public ex_at: Date, public ex_ti: number) {}
}



@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [HttpClientModule, FormsModule, DropdownModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
  providers: [AppComponent, MainpageService],

})
export class MainpageComponent {
  grid: Grid
  x_pole: number
  y_pole: number

  R_variables = ["1", "2", "3", "4"]
  R_selected = "3"

  list_resOfHit = []

  ngOnInit() {
    if (!this.appComponent.isAuth()) {
      this.appComponent.getRouter().navigate(["/login-page"])
    }

    this.grid = new Grid(600, 600, 3, this.myCanvas.nativeElement.getContext("2d"))
    this.grid.draw();
  }

  constructor(private appComponent: AppComponent, private mainpageService: MainpageService){}

  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef

  getAllPoints() {
    // Realizovat
  }

  addPointToTable(resOfHit: ResOfHit) {
    // Realizovat
  }

  deleteAllPoints() {
    // Realizovat
  }

  setNewR(newR: number) {
    this.grid.r = newR
    console.log("wasfsafafs")
  }

  check_num_ogr(min_value: number, max_value: number, num: number): number {
    if (num > max_value) {
      num = max_value;
    } else if (num < min_value) {
      num = min_value;
    }
    return num;
  }

  onMouseMove(event: any) {
    let x = event.offsetX
    let y = event.offsetY
    this.grid.mouse_on_canvas = true
    this.grid.mouse_coords = [x, y]
    // this.grid.setMouseCoords(x, y)
    this.grid.draw()
  }

  onMouseLeave(event: any) {
    this.grid.mouse_on_canvas = false;
    this.grid.mouse_coords = [-10, -10];
    this.grid.draw();
  }

  onCanvasClick(event: any) {
    if (this.grid.cursor_in_good_zone) {
      let x = event.offsetX
      let y = event.offsetY
      // this.grid.need_cross = false;
      let res = this.grid.trans_canvas_to_coords(x, y);
      let x_coords = parseFloat(this.check_num_ogr(this.grid.min_x, this.grid.max_x, res[0]).toFixed(8))
      let y_coords = parseFloat(this.check_num_ogr(this.grid.min_y, this.grid.max_y, res[1]).toFixed(8))


      this.x_pole = x_coords;
      this.y_pole = y_coords;
      res = this.grid.trans_coords_to_canvas(x_coords, y_coords);
      // grid.point_coords = [res[0], res[1], inPrimitive(x_coords, y_coords, grid.r)];
      this.grid.point_coords = [res[0], res[1], 2];
      this.grid.draw();
    }
  }
}

class Grid {
  size_x
  size_y
  r
  raz
  need_cross = true
  point_coords
  scale = 11
  ssx
  ssy
  cursor_in_good_zone = false
  mouse_on_canvas = false
  mouse_coords = [-10, -10]
  ctx

  min_x = -5
  max_x = 5
  min_y = -5
  max_y = 5

  constructor(size_x: number, size_y: number, r: number, context: any) {
    this.size_x = size_x
    this.size_y = size_y
    this.r = r
    this.raz = this.size_x / 60
    this.point_coords = [-this.raz, -this.raz, 2]
    this.scale = 11 // кол-во ступеней в сетке
    this.ssx = this.size_x / this.scale
    this.ssy = this.size_y / this.scale
    this.cursor_in_good_zone = false
    this.mouse_on_canvas = false
    this.mouse_coords = [-10, -10]

    this.ctx = context
    this.ctx.font = "24px roboto";
  }

  draw() {
    this.stroke_panel()
    this.draw_primitives()
    this.draw_grid()
    if (this.mouse_on_canvas) {
      this.drawCross()
    }
    this.drawPoint()
  }

  drawPoint() {
    this.ctx.beginPath()
    this.ctx.fillStyle = "#ffe300"
    if (this.point_coords[2] === 0) {
      this.ctx.fillStyle = "#f00"
    } else if (this.point_coords[2] === 1) {
      this.ctx.fillStyle = "#0f0"
    }

    this.ctx.arc(this.point_coords[0], this.point_coords[1], this.raz / 1.5, 0, Math.PI * 2, true)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.fillStyle = "#000"
  }

  drawCross() {
    let x = this.mouse_coords[0], y = this.mouse_coords[1]
    this.ctx.beginPath()
    this.ctx.strokeStyle = "#ff0000"
    this.ctx.beginPath()

    let mini = this.trans_coords_to_canvas(this.min_x, this.min_y), maxi = this.trans_coords_to_canvas(this.max_x, this.max_y)
    this.ctx.moveTo(mini[0], mini[1])
    this.ctx.lineTo(mini[0], maxi[1])
    this.ctx.lineTo(maxi[0], maxi[1])
    this.ctx.lineTo(maxi[0], mini[1])
    this.ctx.lineTo(mini[0], mini[1])

    // console.log(x, y)

    if (x > mini[0] && x < maxi[0] && y > maxi[1] && y < mini[1]) {
      this.ctx.moveTo(Math.min(Math.max(x, mini[0]), maxi[0]), mini[1])
      this.ctx.lineTo(Math.min(Math.max(x, mini[0]), maxi[0]), maxi[1])
      this.ctx.moveTo(mini[0], Math.min(Math.max(y, maxi[1]), mini[1]))
      this.ctx.lineTo(maxi[0], Math.min(Math.max(y, maxi[1]), mini[1]))
      this.cursor_in_good_zone = true
    } else {
      this.cursor_in_good_zone = false
    }

    this.ctx.stroke()
    this.ctx.strokeStyle = "#000000"
  }

  draw_primitives() {
    let x, y, c = this.trans_coords(0, 0)
    x = c[0]
    y = c[1]

    // Четвертькруг
    this.ctx.fillStyle = "#15b3e8"
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.size_x / this.scale / 2 * this.r, -Math.PI / 2, Math.PI, true)
    this.ctx.lineTo(x, y)
    this.ctx.fill()

    // Прямоугольник
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(...this.trans_coords(this.size_x / this.scale * this.r / 2, 0))
    this.ctx.lineTo(...this.trans_coords(this.size_x / this.scale * this.r / 2, -this.size_y / this.scale * this.r))
    this.ctx.lineTo(...this.trans_coords(0, -this.size_y / this.scale * this.r))
    this.ctx.fill()

    // Треугольник
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(...this.trans_coords(this.size_x / this.scale * this.r, 0))
    this.ctx.lineTo(...this.trans_coords(0, this.size_y / this.scale * this.r))
    this.ctx.fill()

    this.ctx.fillStyle = "#000000"
  }

  draw_grid() {
    // Координатная сетка
    this.ctx.beginPath()
    this.ctx.fillText('Y', this.size_x / 2 + this.raz, 20)
    this.ctx.moveTo(this.size_x / 2, 0)
    this.ctx.lineTo(this.size_x / 2, this.size_y)
    this.ctx.fillText('X', this.size_x - 20, this.size_y / 2 - this.raz - 5)
    this.ctx.moveTo(0, this.size_y / 2)
    this.ctx.lineTo(this.size_x, this.size_y / 2)

    // Стрелочки сетки
    this.ctx.moveTo(this.size_x / 2, 0)
    this.ctx.lineTo(this.size_x / 2 - this.raz, this.raz * 2)
    this.ctx.moveTo(this.size_x / 2, 0)
    this.ctx.lineTo(this.size_x / 2 + this.raz, this.raz * 2)
    this.ctx.moveTo(this.size_x, this.size_y / 2)
    this.ctx.lineTo(this.size_x - this.raz * 2, this.size_y / 2 - this.raz)
    this.ctx.moveTo(this.size_x, this.size_y / 2)
    this.ctx.lineTo(this.size_x - this.raz * 2, this.size_y / 2 + this.raz)


    // Разметка сетки
    // Горизонтальная
    let c, x, y
    for (let i = Math.ceil(-this.scale + 0.5); i < this.scale; i++) {
      if (i == 0) {
        continue
      }
      c = this.trans_coords(this.size_x / this.scale * i / 2, 0)
      x = c[0]
      y = c[1]
      if (i % 2) {
        this.ctx.moveTo(x, y - this.raz / 2)
        this.ctx.lineTo(x, y + this.raz / 2)
      } else {
        this.ctx.fillText(i / 2, x - String(i / 2).length * 5, y - this.raz - 5)
        this.ctx.moveTo(x, y - this.raz)
        this.ctx.lineTo(x, y + this.raz)
      }
    }

    // Вертикальная
    for (let i = Math.ceil(-this.scale + 0.5); i < this.scale; i++) {
      if (i == 0) {
        continue
      }
      c = this.trans_coords(0, -this.size_y / this.scale * i / 2)
      x = c[0]
      y = c[1]
      if (i % 2) {
        this.ctx.moveTo(x - this.raz / 2, y)
        this.ctx.lineTo(x + this.raz / 2, y)
      } else {
        this.ctx.fillText(i / 2, x + this.raz + 5, y + 5)
        this.ctx.moveTo(x - this.raz, y)
        this.ctx.lineTo(x + this.raz, y)
      }
    }
    this.ctx.stroke()
  }

  draw_point(x: number, y: number, s: number) {
    this.ctx.beginPath()
    this.ctx.fillStyle = "#ffe300"
    if (s === 0) {
      this.ctx.fillStyle = "#f00"
    } else if (s === 1) {
      this.ctx.fillStyle = "#0f0"
    }

    let r = this.trans_coords_to_canvas(x, y)
    this.ctx.arc(r[0], r[1], this.raz / 1.5, 0, Math.PI * 2, true)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.fillStyle = "#000"
  }

  trans_coords(x: number, y: number) {
    return [this.size_x / 2 + x, this.size_y / 2 + y]
  }

  stroke_panel() {
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(this.size_x, 0)
    this.ctx.lineTo(this.size_x, this.size_y)
    this.ctx.lineTo(0, this.size_y)
    this.ctx.lineTo(0, 0)
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fill()
    this.ctx.fillStyle = "#000000"
    this.ctx.stroke()
  }

  trans_coords_to_canvas(x_coords: number, y_coords: number) {
    return [x_coords * this.ssx + this.size_x / 2, this.size_y - (y_coords * this.ssy + this.size_y / 2)]
  }

  trans_canvas_to_coords(x_canvas: number, y_canvas: number) {
    return [(x_canvas - this.size_x / 2) / this.ssx, -(y_canvas - this.size_y / 2) / this.ssy]
  }
}
