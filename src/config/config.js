import LoadScene from "../scenes/LoadScene";
import GameScene from "../scenes/GameScene";

export default {
	type: Phaser.AUTO,
	parent: "game",
	width: 3000,
	height: 2200,
	transparent: true,
	scale: {
		mode: Phaser.Scale.FIT,
	    autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [LoadScene, GameScene],
	physics: {
		default: "arcade",
	},
};
