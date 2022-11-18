class TimeMenu {
    constructor() {
        this.buttons = [
            new Button(660,0,100,30,0,true,"#fff",false,"#000","#000","15s"),
            new Button(660,30,100,30,0,true,"#fff",false,"#000","#000","30s"),
            new Button(660,60,100,30,0,true,"#fff",false,"#000","#000","45s"),
            new Button(660,90,100,30,0,true,"#fff",false,"#000","#000","60s"),
        ];
        this.dropdown = false;
    }

    draw() {
        this.buttons[0].draw();

        if (this.dropdown) {
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw()
                if (this.buttons[0].isPressed() && user.time != 15) {
                    user.time = 15;
                    this.dropdown = false;
                } else if (this.buttons[1].isPressed()) {
                    user.time = 30;
                    this.dropdown = false;
                } else if (this.buttons[2].isPressed()) {
                    user.time = 45;
                    this.dropdown = false;
                } else if (this.buttons[3].isPressed()) {
                    user.time = 60;
                    this.dropdown = false;
                }
            }
        }   
        

        if (this.buttons[0].isPressed()) {
            this.dropdown = true;
        } else if (mouseIsPressed) {
            this.dropdown = false;
        }      
    }
}