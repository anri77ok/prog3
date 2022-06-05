class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];



    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }





}








class Grass extends LivingCreature {
    


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 1;

            var newGrass = new Grass(x, y, 1);
            grassArr.push(newGrass);
            this.multiply = 0;





        }
    }
}


class GrassEater extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



       chooseCell(character) {
            this.getNewCoordinates();
            return super.chooseCell(character);
   }




    eat() {
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 2;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 15) {
                this.mul();
            }
        }
        else {
            this.move();



        }


    }




    move() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {

            matrix[this.y][this.x] = 0;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


    mul() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
            eaterArr.push(new GrassEater(x, y, 1));
            this.energy = 8;

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < eaterArr.length; i++) {
            if (eaterArr[i].y == this.y && eaterArr[i].x == this.x) {
                eaterArr.splice(i, 1);
                break;
            }
        }

    }

}


class MultiEater extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 800;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



       chooseCell(character) {
            this.getNewCoordinates();
            return super.chooseCell(character);
   }



    eat() {
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 3;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 810) {
                this.mul();
            }
        }
        else {
            this.move();



        }


    }




    move() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {

            matrix[this.y][this.x] = 0;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }


    mul() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            eaterArr.push(new GrassEater(x, y, 1));
            this.energy = 800;

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < multiArr.length; i++) {
            if (multiArr[i].y == this.y && multiArr[i].x == this.x) {
                multiArr.splice(i, 1);
                break;
            }
        }

    }

}




class Player extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 150;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



       chooseCell(character) {
            this.getNewCoordinates();
            return super.chooseCell(character);
   }





/*    mae(){
        if (this.chooseCell(0)) {
            this.move();
        }else if (this.chooseCell(3)) {
            this.eat();
        }else if (this.chooseCell(1)) {
            this.eat1();
}
    }
*/









     eat1() {











if (random(this.chooseCell(3))) {
            var newCell = random(this.chooseCell(3));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < multiArr.length; i++) {
                if (x == multiArr[i].x && y == multiArr[i].y) {
                    multiArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }
    }else{

        if (KeyPressing.isKeyPressed(87)){
            console.log('The Enter key is being pressed!');
        const newCell = this.chooseCell(1)[1];
        console.log(newCell);
  
                    if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }


    }}




















if (random(this.chooseCell(3))) {
            var newCell = random(this.chooseCell(3));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < multiArr.length; i++) {
                if (x == multiArr[i].x && y == multiArr[i].y) {
                    multiArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }
    }else{
        if (KeyPressing.isKeyPressed(68)){
            console.log('The Enter key is being pressed!');
        const newCell = this.chooseCell(1)[4];
        console.log(newCell);
  
                    if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }}}























if (random(this.chooseCell(3))) {
            var newCell = random(this.chooseCell(3));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < multiArr.length; i++) {
                if (x == multiArr[i].x && y == multiArr[i].y) {
                    multiArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }
    }else{


                if (KeyPressing.isKeyPressed(65)){
            console.log('The Enter key is being pressed!');
        const newCell = this.chooseCell(1)[3];
        console.log(newCell);
  
                    if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }}}




























if (random(this.chooseCell(3))) {
            var newCell = random(this.chooseCell(3));

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < multiArr.length; i++) {
                if (x == multiArr[i].x && y == multiArr[i].y) {
                    multiArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }
    }else{
        if (KeyPressing.isKeyPressed(83)){
            console.log('The Enter key is being pressed!');
        const newCell = this.chooseCell(1)[6];
        console.log(newCell);
  
            if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = 4;
            
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            console.log(this.energy);
            this.energy++;
            
            if (this.energy > 850) {
                this.mul();
            }
        }
        else {
            this.move();



        }}else if (KeyPressing.isKeyPressed(32)) {
            this.multiply++;
            console.log(this.multiply);
  var emptyCells = this.chooseCell(0);
  var newCell = random(emptyCells);

  if (newCell && this.multiply >= 8) {
      var x = newCell[0];
      var y = newCell[1];
      matrix[y][x] = 1;

      var newGrass = new Grass(x, y, 1);
      grassArr.push(newGrass);
      this.multiply = 0;





  }


   }



    }












         
}


 









    move(){
        if (KeyPressing.isKeyPressed(87)){
            console.log('The Enter key is being pressed!');
        const newCell = this.chooseCell(0)[1];
        console.log(newCell);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            this.x = x;
            this.y = y;
            console.log(y);
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }



         }else if (KeyPressing.isKeyPressed(68)) {

            console.log('The Enter key is NOT being pressed!');
            const newCell = this.chooseCell(0)[4];
            console.log(newCell);
                if (newCell) {

                    matrix[this.y][this.x] = 0;
                    var x = newCell[0];
                    var y = newCell[1];
                    matrix[y][x] = 4;
                    this.x = x;
                    this.y = y;
                    console.log(y);
                    this.energy--;
                    if (this.energy <= 0) {
                        this.die();
                    }
                }


         }else if (KeyPressing.isKeyPressed(65)) {

            console.log('The Enter key is NOT being pressed!');
            const newCell = this.chooseCell(0)[3];
            console.log(newCell);
                if (newCell) {

                    matrix[this.y][this.x] = 0;
                    var x = newCell[0];
                    var y = newCell[1];
                    matrix[y][x] = 4;
                    this.x = x;
                    this.y = y;
                    console.log(y);
                    this.energy--;
                    if (this.energy <= 0) {
                        this.die();
                    }
                }


         }else if (KeyPressing.isKeyPressed(83)) {

            console.log('The Enter key is NOT being pressed!');
            const newCell = this.chooseCell(0)[6];
            console.log(newCell);
                if (newCell) {

                    matrix[this.y][this.x] = 0;
                    var x = newCell[0];
                    var y = newCell[1];
                    matrix[y][x] = 4;
                    this.x = x;
                    this.y = y;
                    console.log(y);
                    this.energy--;
                    if (this.energy <= 0) {
                        this.die();
                    }
                }


         }else if (KeyPressing.isKeyPressed(32)) {
                  this.multiply++;
                  console.log(this.multiply);
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 1;

            var newGrass = new Grass(x, y, 1);
            grassArr.push(newGrass);
            this.multiply = 0;





        }


         }
         


    }
        mul() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            eaterArr.push(new GrassEater(x, y, 1));
            this.energy = 800;

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < multiArr.length; i++) {
            if (playerArr[i].y == this.y && playerArr[i].x == this.x) {
                playerArr.splice(i, 1);
                break;
            }
        }

    }
    
    










}


