import "phaser";
import config from "../config/config";

class LoadScene extends Phaser.Scene {
	constructor() {
		super("Load");
	}
	preload() {
		console.log("--- LOAD PRELOAD ---");
		//PROGRESS BAR
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(
			config.width / 2 - 150,
			config.height / 2 - 30,
			320,
			50
		);

		//LOADING TEXT
		let loadingText = this.make.text({
			x: config.width / 2,
			y: config.height / 2 - 50,
			text: "Loading...",
			style: {
				font: "20px monospace",
				fill: "#ffffff",
			},
		});
		loadingText.setOrigin(0.5, 0.5);

		//PERCENT TEXT
		let percentText = this.make.text({
			x: config.width / 2,
			y: config.height / 2 - 5,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff",
			},
		});
		percentText.setOrigin(0.5, 0.5);

		// load assets declared in the preload config
		this.loadImages();

		this.load.on("progress", function (value) {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(
				config.width / 2 - 140,
				config.height / 2 - 20,
				300 * value,
				30
			);
			percentText.setText(parseInt(value * 100) + " %");
		});

		this.load.on("fileprogress", function (file) {});

		this.loadComplete = false;
		this.load.on("complete", function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			this.loadComplete = true;
		});
	}

	create() {
		this.scene.start("Game");
	}

	loadImages() {
		this.load.image("midStadium", "./assets/img/StadiumMid.png");
		this.load.image("rightStadium", "./assets/img/Stadium-Right.png");
		this.load.image("leftStadium", "./assets/img/Stadium-Left.png");
		this.load.image("play", "./assets/img/play.png");
		this.load.image("defaultPlayer", "./assets/img/bowler.png");
		this.load.image("ball", "./assets/img/ball.png");
		

	   this.load.atlas('bowlerSprite', './assets/img/animations/BowlerSprite.png', './assets/img/animations/BowlerSprite.json');

	   this.load.atlas('wicketStump', './assets/img/animations/wicketStump.png', './assets/img/animations/wicketStump.json');

	}
}

export default LoadScene;
