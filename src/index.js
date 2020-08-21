var fullWidth;
var fullHeight;

import "phaser";
import config from "./config/config";
import Bowler from "./Bowler";

/** @type {import ("./typings/types")} */

export class Game extends Phaser.Game {
	constructor() {
		super(config);
		this.scene.add(Bowler);
		this.scene.start("Bowler");
	}
}

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	let aspectRatio = windowHeight/windowWidth;

	fullWidth  = windowWidth;
    fullHeight = windowHeight;
	
    // var windowRatio = windowWidth / windowHeight;
    // var gameRatio = game.config.width / game.config.height;

    // if(windowRatio < gameRatio){
    //     canvas.style.width = windowWidth + "px";
    //     canvas.style.height = (windowWidth / gameRatio) + "px";
    // }
    // else {
    //     canvas.style.width = (windowHeight * gameRatio) + "px";
    //     canvas.style.height = windowHeight + "px";
    // }
}



window.onload = function () {
	window.game = new Game();
	 resize();
     window.addEventListener("resize", resize, false);
};
